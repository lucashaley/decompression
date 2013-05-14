function Light(x, y, falloffx, falloffy, falloffz, colorr, colorg, colorb)
{
	this.originPosition = [x || 0, y || 0];
	this.originFalloff = [falloffx || 0, falloffy || 0, falloffz || 0];
	this.originColor = [colorr || 1.0, colorg || 1.0, colorb || 1.0];
	this.pulsePosition = [0, 0];
	this.pulseFalloff = [0, 0, 0];
	this.pulseColor = [0, 0, 0];
	this.position = this.originPosition;
	this.falloff = this.originFalloff;
	this.color = this.originColor;
}