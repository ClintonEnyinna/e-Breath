#include "e_Interpolator.h"
RespirationCycleInterpolator interpolator;
void setup() {
  Serial.begin(115200);
  interpolator.SetRespirationParameters(100, 12, 3);
}
void loop() {
  double pos, vel;

  interpolator.IncrementTime(10);
  interpolator.GetInterpolation(pos, vel);
  Serial.println(pos);
  delay(10);
}
