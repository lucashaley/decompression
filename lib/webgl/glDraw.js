
/*
	During initialization : 
		
		// passing in DOM canvas object
		glInit(canvas);

		// Loads an image into video memory
		//	image : DOM object containing the image
		// Returns a WebGL object containing the image
		glLoadTexture(image)

		// Generates a blurred emissive texture using a given image and loaded relief texture
		//	image : DOM object containing the image
		// Returns a generated emissive texture (as a WebGL texture object)
		glGenerateEmissive(image)

	Every frame : 

		// Clears the canvas of the previous frame
		glClear();

		// Draws in the give textures at the given location
		//	width, height : dimensions of the drawing region
		//	x, y : origin of the draw region
		//  intensity : [0 -> 1] value to be multiplied by the final computed color
		//	diffuse, normal, relief, emissive : WebGl objects that represent the textures
		//	light1, light2, light3 : the lights given to draw
		glDraw(width, height, x, y, intensity, diffuse, normal, relief, emissive, light1, light2, light3);

		// Draws the given cell from the textures
		//  cellw, cellh : cell width and height
		//  column, row : column and row within the texture
		//  parentWidth, parentHeight, parentX, parentY : Dimensions and position of the parent object this tile is bing drawn onto
		//  parentRelief : WebGL object that repesents the relief texture of the parent object
		glDrawCell(cellw, cellh, column, row, x, y, imageWidth, imageHeight, parentWidth, parentHeight, parentX, parentY, intensity, diffuse, normal, relief, emissive, parentRelief, light1, light2, light3);
*/
var vSource =
[
	"precision mediump float;", 

	"attribute vec4 vertex;", 

	"uniform mat4 proj;", 
	"uniform vec2 screen;", 
	"uniform vec4 pointlight1;", 
	"uniform vec4 pointlight2;", 
	"uniform vec4 pointlight3;", 

	"uniform vec2 dimensions;", 
	"uniform vec2 position;", 
	"uniform vec2 uv_box0;", 
	"uniform vec2 uv_box1;", 
	"uniform bool invert_uv;", 
	"uniform vec2 parent_box0;", 
	"uniform vec2 parent_box1;", 
	
	"varying vec2 pos_coord;", 
	"varying vec2 tex_coord;", 
	"varying vec2 parent_coord;", 

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
	"	if (invert_uv) tex_coord = vec2(vertex.z, 1.0 - vertex.w);", 
	"	else tex_coord = vertex.zw;", 
	"	parent_coord = parent_box0 + (tex_coord * (parent_box1 - parent_box0));", 
	"	tex_coord = uv_box0 + (tex_coord * (uv_box1 - uv_box0));", 

	"	light1_pos = pointlight1.xy / screen;", 
	"	light1_uv = pointlight1.zw;", 
	"	light2_pos = pointlight2.xy / screen;", 
	"	light2_uv = pointlight2.zw;", 
	"	light3_pos = pointlight3.xy / screen;", 
	"	light3_uv = pointlight3.zw;", 

	"	gl_Position = proj * vec4(mapped_pos, 0.0, 1.0);", 
	"}"
].join("\n");
var glFilterSize = 32;
var fSource =
[
	"precision mediump float;", 

	"uniform sampler2D color_map;", 
	"uniform sampler2D normal_map;", 
	"uniform sampler2D relief_map;", 
	"uniform sampler2D emissive_map;", 
	"uniform bool has_color_map;", 
	"uniform bool has_normal_map;", 
	"uniform bool has_relief_map;", 
	"uniform bool has_emissive_map;", 

	"uniform sampler2D parentRelief_map;", 
	"uniform bool has_parentRelief_map;", 

	"uniform vec2 dimensions;", 

	"uniform vec3 ambient_color;", 
	"uniform int num_of_lights;", 

	"uniform vec3 light1_falloff;", 
	"uniform vec3 light1_color;", 
	"uniform vec3 light2_falloff;", 
	"uniform vec3 light2_color;", 
	"uniform vec3 light3_falloff;", 
	"uniform vec3 light3_color;", 

	"uniform float intensity;", 
	"uniform float gaussian_weights[49];", 

	"uniform int flag;", 
	
	"varying vec2 pos_coord;", 
	"varying vec2 tex_coord;", 
	"varying vec2 parent_coord;", 

	"varying vec2 light1_pos;", 
	"varying vec2 light1_uv;", 
	"varying vec2 light2_pos;", 
	"varying vec2 light2_uv;", 
	"varying vec2 light3_pos;", 
	"varying vec2 light3_uv;", 

	"const float ambient_intensity = 0.1;", 

	"const float radius = 3.2;", 
	"const int filter_radius = 3;", 
	"const float pi = 3.14159265359;", 

	"vec3 blur_sample()", 
	"{", 
	"	if (!has_emissive_map) return vec3(0., 0., 0.);", 

	"	vec4 sum = vec4(0., 0., 0., 0.);", 
//	"	sum += texture2D(emissive_map, tex_coord);", 
//	"	if ((sum.r + sum.g + sum.b) > 0.01) return sum.rgb;", 

	"	vec4 sample_relief = texture2D(relief_map, tex_coord);", 
	"	float depth = 1.0;", 
//	"	if (has_relief_map) depth = length(sample_relief.rgb);", 

	"	vec2 blur = vec2(radius, radius) / dimensions;", 
	"	float samples = 0.0;", 
	"	vec2 filter = vec2(cos(gl_PointCoord.x * pi * 2.), sin(gl_PointCoord.y * pi * 2.));", 
	"	for (int i = -filter_radius; i <= filter_radius; i++)", 
	"	{", 
	"		for (int k = -filter_radius; k <= filter_radius; k++)", 
	"		{", 
	"			samples += 1.0;", 
//	"			if (i == 0 && k == 0) continue;",
	"			vec2 sample_coord = vec2(blur.x * (float(k) + depth), blur.y * (float(i) + depth));", 
	"			sample_coord = vec2((sample_coord.x * filter.x) - (sample_coord.y * filter.y), (sample_coord.x * filter.y) + (sample_coord.y * filter.x));", 
//	"			float w = gaussian_weights[((i + filter_radius) * 7) + (k + filter_radius)];", 
	"			sum += texture2D(emissive_map, tex_coord + sample_coord);",  
	"		}", 
	"	}", 
	"	sum /= samples;", 

	"	return sum.rgb;", 
	"}", 

	"float calc_depth(vec3 color)", 
	"{", 
	"	float parent = 0.0;", 
	"	if (has_parentRelief_map) parent = length(texture2D(parentRelief_map, parent_coord).rgb);", 
	"	float diff = 1. - parent;", 
	"	float depth = length(color);", 

	"	if (!has_parentRelief_map) return depth;", 
	"	return parent * depth;", 
	"	return parent + (depth * diff);", 
	"}", 

	"vec3 light_surface(vec3 position, vec3 relief, vec3 surface_color, vec3 surface_normal, vec3 eye, vec3 light, vec3 falloff, vec3 light_color)", 
	"{", 
	"	float dist = distance(light, position);", 
	"	float atten = 1. / (falloff.x + (falloff.y * dist) + (falloff.z * dist * dist));", 

	"	vec3 v = normalize(light - relief);", 
	"	vec3 l = normalize(light - relief);", 
	"	vec3 h = normalize(l + v);", 

	"	float n_dot_l = dot(surface_normal, l);", 
	"	float d = clamp(n_dot_l, ambient_intensity, 1.);", 

	"	vec3 diffuse = light_color * d;", 
	"	vec3 ambient = ambient_color * ambient_intensity;", 
	"	vec3 albedo = ambient + (diffuse * atten);", 

	"	return (surface_color * albedo);", 
	"}", 

	"vec4 main_render()", 
	"{", 
	"	vec4 sample_color = texture2D(color_map, tex_coord);", 
//	"	if (sample_color.w <= 0.01) discard;", 
	"	vec4 sample_normal = texture2D(normal_map, tex_coord);", 
	"	vec4 sample_relief = texture2D(relief_map, tex_coord);", 
	"	vec4 sample_emissive = texture2D(emissive_map, tex_coord);", 

	"	vec3 color = vec3(0., 0., 0.);", 
	"	vec3 normal = vec3(0., 0., 1.);", 
	"	float depth = 1.0;", 
	"	vec3 emissive = vec3(0., 0., 0.);", 

	"	if (has_color_map) color = sample_color.xyz;", 
	"	if (has_normal_map) normal = normalize((sample_normal.xyz * 2.) - 1.);", 
	"	if (has_relief_map) depth = calc_depth(sample_relief.xyz);", 
	"	if (has_emissive_map) emissive = sample_emissive.xyz;", 

	"	vec3 eye = vec3(pos_coord, -depth + 1.01);", 
	"	vec3 position_surface = vec3(pos_coord, 0.);", 
	"	vec3 position_relief = vec3(pos_coord, -depth + 0.01);", 

	"	vec3 light1_relief = vec3(light1_pos, 0.1);", 
	"	vec3 light2_relief = vec3(light2_pos, 0.1);", 
	"	vec3 light3_relief = vec3(light3_pos, 0.1);", 

	"	vec3 sum = vec3(0., 0., 0.);", 
	"	if (num_of_lights > 0) sum += light_surface(", 
	"		position_surface, position_relief, color, normal, eye, ", 
	"		light1_relief, light1_falloff, light1_color", 
	"	);", 
	"	if (num_of_lights > 1) sum += light_surface(", 
	"		position_surface, position_relief, color, normal, eye, ", 
	"		light2_relief, light2_falloff, light2_color", 
	"	);", 
	"	if (num_of_lights > 2) sum += light_surface(", 
	"		position_surface, position_relief, color, normal, eye, ", 
	"		light3_relief, light3_falloff, light3_color", 
	"	);", 
	"	if (num_of_lights < 1) sum = color;", 
	"	sum += emissive;", 
	"	sum *= intensity;", 

	"	return vec4(sum, sample_color.w);", 
	"}", 

	"vec4 emissive_render()", 
	"{", 
	"	vec4 sample_relief = texture2D(relief_map, tex_coord);", 
	"	float depth = length(sample_relief.rgb);", 
	"	vec3 emissive = blur_sample();", 
	"	float alpha = length(emissive);", 
	"	alpha = (alpha * 0.5) + 0.5;", 

	"	return vec4(emissive, alpha);", 
	"}", 

	"void main()", 
	"{", 
	"	if (flag != 0)", 
	"	{", 
	"		gl_FragColor = emissive_render();", 
	"	}", 
	"	else", 
	"	{", 
	"		gl_FragColor = main_render();", 
	"	}", 
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

var glDebug = false;
var glUsingFallback = false;

var gl = null;
var glCanvas = null;

var glShaderProgram = null;
var glShaderUniforms = null;
var glEmissiveFramebuffer = null;
var glRenderbuffer = null;

var glPerspective = null;
var glFilter = null;

function clamp(x)
{
	if (x < 0) x = 0;
	else if (x > 1) x = 1;
	return x;
}

function glEmptyTexture()
{
	if (!gl) return null;
	if (glUsingFallback) return {};
	return gl.createTexture();
}
function glLoadTexture(image)
{
	if (!gl) return null;
	var tex = glEmptyTexture();
	if (glDebug) console.log("LOADING IMAGE : ", image, tex);
	if (glUsingFallback)
	{
		tex.data = image;
		return tex;
	}
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.generateMipmap(gl.TEXTURE_2D);
	if (glDebug) console.log("IMAGE LOADED : ", gl.isTexture(tex))
	gl.bindTexture(gl.TEXTURE_2D, null);
	return tex;
}
function glLoadShader(gl, id, source)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
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
function glRandomFilter(size)
{
	if (size == undefined || size < 2) return null;
	var filter = new Array();
	var values = size * 2;
	for (var i = 0; i < values; i += 2)
	{
		var theta = Math.random() * Math.PI * 2.0;
		var radius = Math.random();
		var x = Math.cos(theta) * radius;
		var y = Math.sin(theta) * radius;
		filter.push(x);
		filter.push(y);
	}
	return filter;
}

function glSetPerspective(matrix)
{
	if (matrix == undefined || matrix == null) return null;
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniformMatrix4fv(glShaderUniforms.proj, false, matrix.flatten());
}
function glSetScreen(width, height)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniform2f(glShaderUniforms.screen, width, height);
}
function glSetDimensions(width, height)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniform2f(glShaderUniforms.dimensions, width, height);
}
function glSetPosition(x, y)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniform2f(glShaderUniforms.position, x, y);
}
function glSetUVBox(u1, v1, u2, v2, invert)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniform2f(glShaderUniforms.uv_box0, u1, v1);
	gl.uniform2f(glShaderUniforms.uv_box1, u2, v2);
	gl.uniform1i(glShaderUniforms.invert_uv, invert);
}
function glSetParentUVBox(u1, v1, u2, v2)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniform2f(glShaderUniforms.parent_box0, u1, v1);
	gl.uniform2f(glShaderUniforms.parent_box1, u2, v2);
}
function glSetOverlay(color)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	if (color == undefined || color == null) gl.uniform3f(glShaderUniforms.overlay, 1.0, 1.0, 1.0);
	else gl.uniform3f(glShaderUniforms.overlay, color.r, color.g, color.b);
}
function glSetTextures(diffuse, normal, relief, emissive)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	if (diffuse == undefined || diffuse == null) gl.uniform1i(glShaderUniforms.has_color_map, 0);
	else
	{
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, diffuse);
		gl.uniform1i(glShaderUniforms.color_map, 0);
		gl.uniform1i(glShaderUniforms.has_color_map, 1);
	}
	if (normal == undefined || normal == null) gl.uniform1i(glShaderUniforms.has_normal_map, 0);
	else
	{
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, normal);
		gl.uniform1i(glShaderUniforms.normal_map, 1);
		gl.uniform1i(glShaderUniforms.has_normal_map, 1);
	}
	if (relief == undefined || relief == null) gl.uniform1i(glShaderUniforms.has_relief_map, 0);
	else
	{
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, relief);
		gl.uniform1i(glShaderUniforms.relief_map, 2);
		gl.uniform1i(glShaderUniforms.has_relief_map, 1);
	}
	if (emissive == undefined || emissive == null) gl.uniform1i(glShaderUniforms.has_emissive_map, 0);
	else
	{
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, emissive);
		gl.uniform1i(glShaderUniforms.emissive_map, 3);
		gl.uniform1i(glShaderUniforms.has_emissive_map, 1);
	}
}
function glSetParentTexture(parentRelief)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	if (parentRelief == undefined || parentRelief == null) gl.uniform1i(glShaderUniforms.has_parentRelief_map, 0);
	else
	{
		gl.activeTexture(gl.TEXTURE4);
		gl.bindTexture(gl.TEXTURE_2D, parentRelief);
		gl.uniform1i(glShaderUniforms.parentRelief_map, 4);
		gl.uniform1i(glShaderUniforms.has_parentRelief_map, 1);
	}
}
function glSet3Lights(width, height, x, y, light1, light2, light3)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	var lights = 0;
	var p0x = x - (width / 2);
	var p0y = y - (height / 2);
	if (light1 != undefined || light1 != null)
	{
		var light1u = (light1.position[0] - p0x) / width;
		var light1v = (light1.position[1] - p0y) / height;
		gl.uniform4f(glShaderUniforms.pointlight1,
		light1.position[0], light1.position[1],
		clamp(light1u), clamp(light1v));
		gl.uniform3fv(glShaderUniforms.light1_falloff, light1.falloff);
		gl.uniform3fv(glShaderUniforms.light1_color, light1.color);
		lights++;
	}
	if (light2 != undefined || light2 != null)
	{
		var light2u = (light2.position[0] - p0x) / width;
		var light2v = (light2.position[1] - p0y) / height;
		gl.uniform4f(glShaderUniforms.pointlight2,
		light2.position[0], light2.position[1],
		clamp(light2u), clamp(light2v));
		gl.uniform3fv(glShaderUniforms.light2_falloff, light2.falloff);
		gl.uniform3fv(glShaderUniforms.light2_color, light2.color);
		lights++;
	}
	if (light3 != undefined || light3 != null)
	{
		var light3u = (light3.position[0] - p0x) / width;
		var light3v = (light3.position[1] - p0y) / height;
		gl.uniform4f(glShaderUniforms.pointlight3,
		light3.position[0], light3.position[1],
		clamp(light3u), clamp(light3v));
		gl.uniform3fv(glShaderUniforms.light3_falloff, light3.falloff);
		gl.uniform3fv(glShaderUniforms.light3_color, light3.color);
		lights++;
	}
	gl.uniform1i(glShaderUniforms.num_of_lights, lights);
}
function glSetIntensity(intensity)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	if (intensity == undefined || intensity == null) gl.uniform1f(glShaderUniforms.intensity, 1.0);
	else gl.uniform1f(glShaderUniforms.intensity, intensity);
}
function glSetFlag(flag)
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.uniform1i(glShaderUniforms.flag, flag);
}

function glClear()
{
	if (!gl) return null;
	if (glUsingFallback)
	{
		gl.clearRect(0, 0, glCanvas.width, glCanvas.height);
		return;
	}
	gl.viewport(0, 0, glCanvas.width, glCanvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT);
}
function glBatch()
{
	if (!gl) return null;
	if (glUsingFallback) return null;
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function glDraw(width, height, x, y, intensity, diffuse, normal, relief, emissive, light1, light2, light3)
{
	if (!gl) return null;
	if (diffuse == null && normal == null && relief == null && emissive == null) return null;
	if (diffuse == undefined && normal == undefined && relief == undefined && emissive == undefined) return null;
	if (glUsingFallback)
	{
		gl.drawImage(diffuse.data, x - (width / 2), y - (height / 2), width, height);
		return;
	}

	glSetPerspective(glPerspective);
	glSetScreen(glCanvas.width, glCanvas.height);
	glSetDimensions(width, height);
	glSetPosition(x, glCanvas.height - y);
	glSetUVBox(0, 0, 1, 1, false);
	glSetParentUVBox(0, 0, 1, 1);
	glSetTextures(diffuse, normal, relief, emissive);
	glSetParentTexture(null);
	glSet3Lights(width, height, x, glCanvas.height - y, light1, light2, light3);
	glSetIntensity(intensity);

	glSetFlag(0);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	glBatch();
}
function glDrawCell(cellw, cellh, column, row, x, y, imageWidth, imageHeight, parentWidth, parentHeight, parentX, parentY, intensity, diffuse, normal, relief, emissive, parentRelief, light1, light2, light3)
{
	if (!gl) return null;
	if (diffuse == null && normal == null && relief == null && emissive == null && reliefTexture == null) return null;
	if (diffuse == undefined && normal == undefined && relief == undefined && emissive == undefined && reliefTexture == undefined) return null;

	var u1 = (column * cellw) / imageWidth;
	var v1 = (imageHeight - (row * cellh)) / imageHeight;
	var u2 = ((column + 1) * cellw) / imageWidth;
	var v2 = (imageHeight - ((row + 1) * cellh)) / imageHeight;

	if (glUsingFallback)
	{
		gl.drawImage(diffuse.data, u1 * imageWidth, v1 * imageHeight, cellw, cellh, x - (imageWidth / 2), y - (imageHeight / 2), imageWidth, imageHeight);
		return;
	}

	var pu1 = clamp(((x - (cellw / 2)) - (parentX - (parentWidth / 2))) / parentWidth);
	var pv1 = 1.0 - clamp(((y - (cellh / 2)) - (parentY - (parentHeight / 2))) / parentHeight);
	var pu2 = clamp(((x + (cellw / 2)) - (parentX - (parentWidth / 2))) / parentWidth);
	var pv2 = 1.0 - clamp(((y + (cellh / 2)) - (parentY - (parentHeight / 2))) / parentHeight);

	glSetPerspective(glPerspective);
	glSetScreen(glCanvas.width, glCanvas.height);
	glSetDimensions(cellw, cellh);
	glSetPosition(x, glCanvas.height - y);
	glSetUVBox(u1, v1, u2, v2, true);
	glSetParentUVBox(pu1, pv1, pu2, pv2);
	glSetTextures(diffuse, normal, relief, emissive);
	glSetParentTexture(parentRelief);
	glSet3Lights(cellw, cellh, x, glCanvas.height - y, light1, light2, light3);
	glSetIntensity(intensity);

	glSetFlag(0);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	glBatch();
}
function glGenerateEmissive(image)
{
	if (!gl) return null;
	if (image == null || image == undefined) return null;
	if (glUsingFallback) return null;

	var originalEmissive = glEmptyTexture();
	originalEmissive = glLoadTexture(image);

	gl.bindFramebuffer(gl.FRAMEBUFFER, glEmissiveFramebuffer);
	gl.bindRenderbuffer(gl.RENDERBUFFER, glRenderbuffer);
	glEmissiveFramebuffer.width = image.width;
	glEmissiveFramebuffer.height = image.height;

	var emissiveTexture = glEmptyTexture();
	gl.bindTexture(gl.TEXTURE_2D, emissiveTexture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, image.width, image.height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, emissiveTexture, 0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, glRenderbuffer);

	if (glDebug)
	{
		console.log('FRAMEBUFFER PARAMS : ', glEmissiveFramebuffer, glRenderbuffer, originalEmissive,image);
		var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (status == gl.FRAMEBUFFER_COMPLETE) console.log('FRAMEBUFFER_COMPLETE');
		if (status == gl.FRAMEBUFFER_UNSUPPORTED) console.log('FRAMEBUFFER_UNSUPPORTED');
		if (status == gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT) console.log('FRAMEBUFFER_INCOMPLETE_ATTACHMENT');
		if (status == gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS) console.log('FRAMEBUFFER_INCOMPLETE_DIMENSIONS');
		if (status == gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT) console.log('FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT');
	}

	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);

	gl.bindFramebuffer(gl.FRAMEBUFFER, glEmissiveFramebuffer);
	gl.viewport(0, 0, image.width, image.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	glSetPerspective(makeOrtho(0, image.width, 0, image.height, -1, 1).ensure4x4());
	glSetScreen(image.width, image.height);
	glSetDimensions(image.width, image.height);
	glSetPosition(image.width / 2, image.height / 2);
	glSetUVBox(0, 0, 1, 1);
	glSetParentUVBox(0, 0, 1, 1);
	glSetTextures(null, null, null, originalEmissive);
	glSetParentTexture(null);
	glSetIntensity(1);

	glSetFlag(1);
	glBatch();

	gl.finish();

	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0, 0, glCanvas.width, glCanvas.height);

	gl.bindTexture(gl.TEXTURE_2D, emissiveTexture);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	return emissiveTexture;
}

function glInit(canvas)
{
	if (glDebug) console.log("STARTING WEBGL ", canvas);

	if (canvas == undefined || canvas == null)
	{
		alert("Unable to initialize. Could not find the canvas.");
		return false;
	}

	glCanvas = canvas;
	gl = 
		glCanvas.getContext("webgl", {premultipliedAlpha: false}) || 
		glCanvas.getContext("moz-webgl", {premultipliedAlpha: false}) || 
		glCanvas.getContext("experimental-webgl", {premultipliedAlpha: false}) || 
		glCanvas.getContext("webkit-3d", {premultipliedAlpha: false});

	if (glDebug) console.log("GL CONTEXT ", gl);

	if (!gl)
	{
		gl = glCanvas.getContext("2d");
		glUsingFallback = true;
		if (glDebug) console.log("USING 2D FALLBACK ", gl);
		if (!gl) alert("Unable to initialize WebGL. Your browser may not support it.");
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
		gl = null;
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
	glShaderUniforms.uv_box0 = gl.getUniformLocation(glShaderProgram, "uv_box0");
	glShaderUniforms.uv_box1 = gl.getUniformLocation(glShaderProgram, "uv_box1");
	glShaderUniforms.invert_uv = gl.getUniformLocation(glShaderProgram, "invert_uv");
	glShaderUniforms.parent_box0 = gl.getUniformLocation(glShaderProgram, "parent_box0");
	glShaderUniforms.parent_box1 = gl.getUniformLocation(glShaderProgram, "parent_box1");
	glShaderUniforms.pointlight1 = gl.getUniformLocation(glShaderProgram, "pointlight1");
	glShaderUniforms.pointlight2 = gl.getUniformLocation(glShaderProgram, "pointlight2");
	glShaderUniforms.pointlight3 = gl.getUniformLocation(glShaderProgram, "pointlight3");
	glShaderUniforms.color_map = gl.getUniformLocation(glShaderProgram, "color_map");
	glShaderUniforms.normal_map = gl.getUniformLocation(glShaderProgram, "normal_map");
	glShaderUniforms.relief_map = gl.getUniformLocation(glShaderProgram, "relief_map");
	glShaderUniforms.emissive_map = gl.getUniformLocation(glShaderProgram, "emissive_map");
	glShaderUniforms.has_color_map = gl.getUniformLocation(glShaderProgram, "has_color_map");
	glShaderUniforms.has_normal_map = gl.getUniformLocation(glShaderProgram, "has_normal_map");
	glShaderUniforms.has_relief_map = gl.getUniformLocation(glShaderProgram, "has_relief_map");
	glShaderUniforms.has_emissive_map = gl.getUniformLocation(glShaderProgram, "has_emissive_map");
	glShaderUniforms.parentRelief_map = gl.getUniformLocation(glShaderProgram, "parentRelief_map");
	glShaderUniforms.has_parentRelief_map = gl.getUniformLocation(glShaderProgram, "has_parentRelief_map");
	glShaderUniforms.ambient_color = gl.getUniformLocation(glShaderProgram, "ambient_color");
	glShaderUniforms.light1_falloff = gl.getUniformLocation(glShaderProgram, "light1_falloff");
	glShaderUniforms.light1_color = gl.getUniformLocation(glShaderProgram, "light1_color");
	glShaderUniforms.light2_falloff = gl.getUniformLocation(glShaderProgram, "light2_falloff");
	glShaderUniforms.light2_color = gl.getUniformLocation(glShaderProgram, "light2_color");
	glShaderUniforms.light3_falloff = gl.getUniformLocation(glShaderProgram, "light3_falloff");
	glShaderUniforms.light3_color = gl.getUniformLocation(glShaderProgram, "light3_color");
	glShaderUniforms.num_of_lights = gl.getUniformLocation(glShaderProgram, "num_of_lights");
	glShaderUniforms.intensity = gl.getUniformLocation(glShaderProgram, "intensity");
	glShaderUniforms.gaussian_weights = gl.getUniformLocation(glShaderProgram, "gaussian_weights");
	glShaderUniforms.flag = gl.getUniformLocation(glShaderProgram, "flag");

	glPerspective = makeOrtho(0, glCanvas.width, 0, glCanvas.height, -1, 1).ensure4x4();

	gl.viewport(0, 0, glCanvas.width, glCanvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	glEmissiveFramebuffer = gl.createFramebuffer();
	glRenderbuffer = gl.createRenderbuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, glEmissiveFramebuffer);
	gl.bindRenderbuffer(gl.RENDERBUFFER, glRenderbuffer);

	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);

	var glGaussianWeights = 
	[
		0.000001, 0.000020, 0.000171, 0.000352, 0.000171, 0.000020, 0.000001, 
		0.000020, 0.000722, 0.006262, 0.012865, 0.006262, 0.000722, 0.000020, 
		0.000171, 0.006262, 0.054300, 0.111555, 0.054300, 0.006262, 0.000171, 
		0.000352, 0.012865, 0.111555, 0.229183, 0.111555, 0.012865, 0.000352, 
		0.000171, 0.006262, 0.054300, 0.111555, 0.054300, 0.006262, 0.000171, 
		0.000020, 0.000722, 0.006262, 0.012865, 0.006262, 0.000722, 0.000020, 
		0.000001, 0.000020, 0.000171, 0.000352, 0.000171, 0.000020, 0.000001
	];
	//if (glDebug) console.log(glGaussianWeights);
	gl.uniform1fv(glShaderProgram.gaussian_weights, glGaussianWeights);

	if (glDebug) console.log(glShaderUniforms, glShaderProgram);

	return true;
}