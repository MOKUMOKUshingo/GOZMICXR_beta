# ADD 12: VR/AR controller and sound fixes

Base: ADD 11 move/seek/parabolic-screen version.

## Fixed points

1. VR left-controller horizontal stick movement
   - The sideways vector was using the opposite handedness from the desktop WASD movement.
   - It now uses the same camera-facing right-vector logic as WASD, so left on the stick moves left and right moves right.

2. AR trigger interaction
   - AR select/trigger handling now keeps select state in AR as well.
   - If AR hit-test reticle placement fails, the mini gallery is placed in front of the AR camera as a fallback.
   - AR video screen has a larger transparent hit target, making trigger/tap interaction much easier.
   - AR select also uses an XR view-center fallback ray, useful for phone-based AR taps where controller matrices can be unreliable.

3. VR audio
   - In VR/AR, selecting the project-movie screen now requests sound playback instead of muted playback.
   - If the browser blocks sound, it safely falls back to muted playback rather than black screen/failure.
   - The code now removes the muted attribute when sound playback is requested.

## Video file note

The heavy movie is still expected at:

video/projectmovie1.mp4

It is intentionally not bundled in this ZIP.
