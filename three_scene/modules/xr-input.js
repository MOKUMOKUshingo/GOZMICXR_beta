// WebXR gamepad axis helpers.
export function extractGamepadStickAxes(gamepad) {
  if (!gamepad || !gamepad.axes) return { x: 0, y: 0 };
  const axes = gamepad.axes;
  const safe = (v) => Number.isFinite(v) ? v : 0;
  const stick23 = { x: safe(axes[2]), y: safe(axes[3]) };
  const stick01 = { x: safe(axes[0]), y: safe(axes[1]) };
  // Meta Quest / WebXR thumbsticks normally use axes[2]/axes[3]. Prefer them
  // when they are present, because axes[0]/axes[1] can be a touchpad/thumb-rest
  // source on some runtimes and makes movement feel world-fixed or skewed.
  if (axes.length >= 4 && Math.abs(stick23.x) + Math.abs(stick23.y) > 0.02) return stick23;
  return stick01;
}


export function applyDeadzone(value, deadzone = 0.16) {
  if (Math.abs(value) < deadzone) return 0;
  const sign = Math.sign(value);
  return sign * ((Math.abs(value) - deadzone) / (1 - deadzone));
}

