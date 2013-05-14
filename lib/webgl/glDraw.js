
/*
	During initialization : 
		
		// passing in DOM canvas object
		glInit(canvas);

		// Returns an empty container for a WebGL texture
		glEmptyTexture();

		// Loads an image into video memory
		//	image : DOM object containing the image
		//	texture : empty WebGL object to associate with the image
		glLoadTexture(image, texture)

	Every frame : 

		// Clears the canvas of the previous frame
		glClear();

		// Draws in the give textures at the given location
		//	width, height : dimensions of the drawing region
		//	x, y : origin of the draw region
		//  overlayColor : color to overlay on the image, if null defualts to white
		//	diffuse, normal, relief, emissive : WebGl objects that represent the textures
		//	light1, light2, light3 : the lights given to draw
		glDraw(width, height, x, y, overlayColor, diffuse, normal, relief, emissive, light1, light2, light3);
*/
var vSource = 
[
	"precision mediump float;", 

	"attribute vec4 vertex;", 

	"uniform mat4 proj;", 
	"uniform vec2 screen;", 
	"uniform vec2 pointlight1;", 
	"uniform vec2 pointlight2;", 
	"uniform vec2 pointlight3;", 

	"uniform vec2 dimensions;", 
	"uniform vec2 position;", 
	
	"varying vec2 pos_coord;", 
	"varying vec2 tex_coord;", 

	"varying vec2 light1_pos;", 
	"varying vec2 light1_uv;", 
	"varying vec2 light2_pos;", 
	"varying vec2 light2_uv;", 
	"varying vec2 light3_pos;", 
	"varying vec2 light3_uv;", 

	"void main(void)", 
	"{", 
	"	vec2 mapped_pos = (vertex.xy * dimensions) + position;", 

	"	pos_coord = mapped_pos / screen;", 
	"	tex_coord = vertex.zw;", 

	"	light1_pos = pointlight1 / screen;", 
	"	light1_uv = (pointlight1 - position) / dimensions;", 
	"	light2_pos = pointlight2 / screen;", 
	"	light2_uv = (pointlight2 - position) / dimensions;", 
	"	light3_pos = pointlight3 / screen;", 
	"	light3_uv = (pointlight3 - position) / dimensions;", 

	"	gl_Position = proj * vec4(mapped_pos, 0.0, 1.0);", 
	"}"
].join("\n");
var fSource = 
[
	"precision mediump float;", 

	"uniform sampler2D color_map;", 
	"uniform sampler2D normal_map;", 
	"uniform sampler2D relief_map;", 
	"uniform sampler2D emissive_map;", 

	"uniform vec3 overlay;", 

	"uniform vec3 ambient_color;", 
	"uniform int num_of_lights;", 

	"uniform vec3 light1_falloff;", 
	"uniform vec3 light1_color;", 
	"uniform vec3 light2_falloff;", 
	"uniform vec3 light2_color;", 
	"uniform vec3 light3_falloff;", 
	"uniform vec3 light3_color;", 
	
	"varying vec2 pos_coord;", 
	"varying vec2 tex_coord;", 

	"varying vec2 light1_pos;", 
	"varying vec2 light1_uv;", 
	"varying vec2 light2_pos;", 
	"varying vec2 light2_uv;", 
	"varying vec2 light3_pos;", 
	"varying vec2 light3_uv;", 

	"const float light_intensity = 1.0;", 
	"const float ambient_intensity = 0.1;", 
	"const float specular_intensity = 1.0;", 

	"const float roughness = 0.4;", 
	"const float ref_index = 1.25;", 

	"vec3 blur_sample(sampler2D map, vec2 resolution, vec2 uv, float radius)", 
	"{", 
	"	vec3 sum = vec3(0., 0., 0.);", 
	"	vec2 blur = radius / resolution;", 
	"	vec2 o = uv * resolution;", 
	"	vec2 hstep = o - vec2(1., 0.);", 
	"	vec2 vstep = o - vec2(0.,1.);", 

	"	//sum += texture2D(map, vec2());", 

	"	return sum;", 
	"}", 

	"vec3 light_surface(vec3 position, vec3 relief, vec3 surface_color, vec3 surface_normal, vec3 eye, vec3 light, vec3 falloff, vec3 light_color, vec3 emissive_color)", 
	"{", 
	"	float dist = distance(light, position);", 
	"	float atten = 1. / (falloff.x + (falloff.y * dist) + (falloff.z * dist * dist));", 

	"	vec3 v = normalize(light - relief);", 
	"	vec3 l = normalize(light - relief);", 
	"	vec3 h = normalize(l + v);", 

	"	float n_dot_l = dot(surface_normal, l);", 
	"	float n_dot_h = dot(surface_normal, h);", 
	"	float n_dot_v = dot(surface_normal, v);", 
	"	float h_dot_v = dot(surface_normal, v);", 
	"	float h_dot_l = dot(surface_normal, l);", 

	"	float d = clamp(n_dot_l * atten, ambient_intensity, 1.);", 

	/*"	float g1 = (2. * n_dot_h * n_dot_v) / h_dot_v;", 
	"	float g2 = (2. * n_dot_h * n_dot_l) / h_dot_v;", 
	"	float g = 1.;", 
	"	if (g1 < g) g = g1;", 
	"	if (g2 < g) g = g2;", 
	"	float m = roughness * roughness;", 
	"	float r = (1. / (m * pow(n_dot_h, 4.))) * exp((pow(n_dot_h, 2.) - 1.) / (m * pow(n_dot_h, 2.)));", 
	"	float f = (ref_index + pow(1. - h_dot_v, 5.)) * (1. - ref_index);", 
	"	float s = max((abs(f * r * g) / n_dot_v), 0.) * atten;", */

	"	vec3 diffuse = light_color * d;", 
	"	vec3 ambient = ambient_color * ambient_intensity;", 
	"	vec3 intensity = ambient + (diffuse * atten);", 
	//"	vec3 specular = emissive_color * s * specular_intensity * d;", 

	"	return (surface_color * intensity);// + specular;", 
	"}", 

	"void main(void)", 
	"{", 
	"	vec4 sample_color = texture2D(color_map, tex_coord);", 
	"	vec4 sample_normal = texture2D(normal_map, tex_coord);", 
	"	vec4 sample_relief = texture2D(relief_map, tex_coord);", 
	"	vec4 sample_emissive = texture2D(emissive_map, tex_coord);", 

	"	vec3 color = sample_color.xyz;", 
	"	float depth = (sample_relief.x + sample_relief.y + sample_relief.z) / 3.;", 
	"	vec3 normal = normalize((sample_normal.xyz * 2.) - 1.);", 
	"	vec3 emissive = sample_emissive.xyz;", 
	"	vec3 eye = vec3(pos_coord, -depth + 1.01);", 
		
	"	vec3 position_surface = vec3(pos_coord, 0.);", 
	"	vec3 position_relief = vec3(pos_coord, -depth + 0.01);", 

	"	float light1_depth = texture2D(relief_map, light1_uv).r;", 
	"	float light2_depth = texture2D(relief_map, light2_uv).r;", 
	"	float light3_depth = texture2D(relief_map, light3_uv).r;", 
	"	vec3 light1_relief = vec3(light1_pos, -light1_depth + 0.1);", 
	"	vec3 light2_relief = vec3(light2_pos, -light1_depth + 0.1);", 
	"	vec3 light3_relief = vec3(light3_pos, -light1_depth + 0.1);", 

	"	vec3 sum = vec3(0., 0., 0.);", 
	"	if (num_of_lights > 0) sum += light_surface(", 
	"		position_surface, position_relief, color, normal, eye, ", 
	"		light1_relief, light1_falloff, light1_color, emissive", 
	"	);", 
	"	if (num_of_lights > 1) sum += light_surface(", 
	"		position_surface, position_relief, color, normal, eye, ", 
	"		light2_relief, light2_falloff, light2_color, emissive", 
	"	);", 
	"	if (num_of_lights > 2) sum += light_surface(", 
	"		position_surface, position_relief, color, normal, eye, ", 
	"		light3_relief, light3_falloff, light3_color, emissive", 
	"	);", 
	"	if (num_of_lights == 0) sum = color;", 

	"	gl_FragColor = vec4(sum, sample_color.w);", 
	"}"
].join("\n");
var glVertexData = 
[
	0.5, 0.5, 1.0, 1.0, 
	-0.5, 0.5, 0.0, 1.0, 
	0.5, -0.5, 1.0, 0.0, 
	
	-0.5, 0.5, 0.0, 1.0, 
	0.5, -0.5, 1.0, 0.0, 
	-0.5, -0.5, 0.0, 0.0
];

var glCanvas = null;
var gl = null;

var glShaderProgram = null;
var glShaderUniforms = null;

var perspective_matrix = null;

function glEmptyTexture()
{
	if (!gl) return null;
	return gl.createTexture();
}
function glLoadTexture(image, texture)
{
	if (!gl) return null;
	//console.log("LOADING IMAGE : ", image, texture);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.generateMipmap(gl.TEXTURE_2D);
	//console.log("IMAGE LOADED : ", gl.isTexture(texture))
	gl.bindTexture(gl.TEXTURE_2D, null);
}
function glLoadShader(gl, id, source)
{
	var shader = gl.createShader(id);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		alert("An error occurred compiling the shaders: \n" + gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function glDraw(width, height, x, y, overlayColor, diffuse, normal, relief, emissive, light1, light2, light3)
{
	//console.log(width, height, x, y, overlayColor, diffuse, normal, relief, emissive, light1, light2, light3);
	if (!gl) return null;
	gl.uniformMatrix4fv(glShaderUniforms.proj, false, perspective_matrix.flatten());
	gl.uniform2fv(glShaderUniforms.screen, [glCanvas.width, glCanvas.height]);
	gl.uniform2fv(glShaderUniforms.dimensions, [width, height]);
	gl.uniform2fv(glShaderUniforms.position, [x, glCanvas.height - y]);

	var overlayArr = [1.0, 1.0, 1.0];
	if (overlayColor != undefined || overlayColor != null)
	{
		overlayArr[0] = overlayColor.r;
		overlayArr[1] = overlayColor.g;
		overlayArr[2] = overlayColor.b;
	}
	gl.uniform3fv(glShaderUniforms.overlay, overlayArr);

	if (diffuse != undefined || diffuse != null)
	{
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, diffuse);
		gl.uniform1i(glShaderUniforms.color_map, 0);
	}
	if (normal != undefined || normal != null)
	{
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, normal);
		gl.uniform1i(glShaderUniforms.normal_map, 1);
	}
	if (relief != undefined || relief != null)
	{
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, relief);
		gl.uniform1i(glShaderUniforms.relief_map, 2);
	}
	if (emissive != undefined || emissive != null)
	{
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, emissive);
		gl.uniform1i(glShaderUniforms.emissive_map, 3);
	}

	var lights = 0;
	if (light1 != undefined || light1 != null)
	{
		gl.uniform2fv(glShaderUniforms.pointlight1, light1.position);
		gl.uniform3fv(glShaderUniforms.light1_falloff, light1.falloff);
		gl.uniform3fv(glShaderUniforms.light1_color, light1.color);
		lights++;
	}
	if (light2 != undefined || light2 != null)
	{
		gl.uniform2fv(glShaderUniforms.pointlight2, light2.position);
		gl.uniform3fv(glShaderUniforms.light2_falloff, light2.falloff);
		gl.uniform3fv(glShaderUniforms.light2_color, light2.color);
		lights++;
	}
	if (light3 != undefined || light3 != null)
	{
		gl.uniform2fv(glShaderUniforms.pointlight3, light3.position);
		gl.uniform3fv(glShaderUniforms.light3_falloff, light3.falloff);
		gl.uniform3fv(glShaderUniforms.light3_color, light3.color);
		lights++;
	}
	gl.uniform1i(glShaderUniforms.num_of_lights, lights);

	gl.drawArrays(gl.TRIANGLES, 0, 6);

	var err = gl.getError();
	if (err != gl.NO_ERROR) console.log(err);
}
function glClear()
{
	if (!gl) return null;
	gl.clear(gl.COLOR_BUFFER_BIT);
}

function glInit(canvas)
{
	if (canvas == undefined || canvas == null)
	{
		alert("Unable to initialize WebGL. Could not find the canvas.");
		return false;
	}

	glCanvas = canvas;
	gl = glCanvas.getContext("webgl") || glCanvas.getContext("experimental-webgl") || glCanvas.getContext("moz-webgl") || glCanvas.getContext("webkit-3d")|| glCanvas.getContext("webkit-2d");

	if (!gl)
	{
		alert("Unable to initialize WebGL. Your browser may not support it.");
		return false;
	}

	var vs = glLoadShader(gl, gl.VERTEX_SHADER, vSource);
	var fs = glLoadShader(gl, gl.FRAGMENT_SHADER, fSource);

	glShaderProgram = gl.createProgram();
	gl.attachShader(glShaderProgram, vs);
	gl.attachShader(glShaderProgram, fs);
	gl.linkProgram(glShaderProgram);

	if (!gl.getProgramParameter(glShaderProgram, gl.LINK_STATUS))
	{
		alert("Unable to initialize the shader program");
		return false;
	}

	gl.useProgram(glShaderProgram);

	glShaderProgram.attribute_vert = gl.getAttribLocation(glShaderProgram, "vertex");
	gl.enableVertexAttribArray(glShaderProgram.attribute_vert);

	glShaderProgram.vert_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, glShaderProgram.vert_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(glVertexData), gl.STATIC_DRAW);
	gl.vertexAttribPointer(glShaderProgram.attribute_vert, 4, gl.FLOAT, false, 0, 0);

	glShaderUniforms = {};
	glShaderUniforms.proj = gl.getUniformLocation(glShaderProgram, "proj");
	glShaderUniforms.screen = gl.getUniformLocation(glShaderProgram, "screen");
	glShaderUniforms.dimensions = gl.getUniformLocation(glShaderProgram, "dimensions");
	glShaderUniforms.position = gl.getUniformLocation(glShaderProgram, "position");
	glShaderUniforms.pointlight1 = gl.getUniformLocation(glShaderProgram, "pointlight1");
	glShaderUniforms.pointlight2 = gl.getUniformLocation(glShaderProgram, "pointlight2");
	glShaderUniforms.pointlight3 = gl.getUniformLocation(glShaderProgram, "pointlight3");
	glShaderUniforms.color_map = gl.getUniformLocation(glShaderProgram, "color_map");
	glShaderUniforms.normal_map = gl.getUniformLocation(glShaderProgram, "normal_map");
	glShaderUniforms.relief_map = gl.getUniformLocation(glShaderProgram, "relief_map");
	glShaderUniforms.emissive_map = gl.getUniformLocation(glShaderProgram, "emissive_map");
	glShaderUniforms.overlay = gl.getUniformLocation(glShaderProgram, "overlay");
	glShaderUniforms.ambient_color = gl.getUniformLocation(glShaderProgram, "ambient_color");
	glShaderUniforms.light1_falloff = gl.getUniformLocation(glShaderProgram, "light1_falloff");
	glShaderUniforms.light1_color = gl.getUniformLocation(glShaderProgram, "light1_color");
	glShaderUniforms.light2_falloff = gl.getUniformLocation(glShaderProgram, "light2_falloff");
	glShaderUniforms.light2_color = gl.getUniformLocation(glShaderProgram, "light2_color");
	glShaderUniforms.light3_falloff = gl.getUniformLocation(glShaderProgram, "light3_falloff");
	glShaderUniforms.light3_color = gl.getUniformLocation(glShaderProgram, "light3_color");
	glShaderUniforms.num_of_lights = gl.getUniformLocation(glShaderProgram, "num_of_lights");

	perspective_matrix = makeOrtho(0, glCanvas.width, 0, glCanvas.height, -1, 1).ensure4x4();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.viewport(0, 0, glCanvas.width, glCanvas.height);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.DEST_ALPHA);

	//console.log(glShaderUniforms);

	return true;
}