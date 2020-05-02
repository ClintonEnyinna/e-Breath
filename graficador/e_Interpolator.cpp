#if ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#include "e_Interpolator.h"

RespirationCycleInterpolator::RespirationCycleInterpolator() {
}


RespirationCycleInterpolator::RespirationCycleInterpolator(double volume, double bpm, double ie) {
	Volume = volume;
	BPM = bpm;
	IE = ie;



	CalcParameters();
}

void RespirationCycleInterpolator::CalcParameters()
{
	T = 60 / BPM * 1000;
	Tin = T / (1 + IE);
	Tex = T - Tin - Th;
	Vin = Volume / Tin;

	Vex = Vin / IE - Th;
}

void RespirationCycleInterpolator::QueueRespirationParameters(double volume, double bpm, double ie)
{
	queuedParameters = true;
	qVolume = volume;
	qBPM = bpm;
	qIE = ie;
}

void RespirationCycleInterpolator::SetRespirationParameters(double volume, double bpm, double ie)
{
	Volume = volume;
	BPM = bpm;
	IE = ie;

	CalcParameters();
}

// Returns the interpolation point calculated at a time t (in milliseconds)
void RespirationCycleInterpolator::GetInterpolationAt(long t, double& pos, double& vel, double& accel, double& jerk)
{
	int index;
	float duration_phase;
	float d_t;
  
	if (t < Tin)
	{
		index = map(t, 0, Tin, 0, RESPIRATION_POINTS_LENGTH / 2 - 1);
		duration_phase = Tin;
		d_t = Tin / 1000.0 / (RESPIRATION_POINTS_LENGTH / 2);
	}else
	{
		index = map(t, Tin, T, RESPIRATION_POINTS_LENGTH / 2, RESPIRATION_POINTS_LENGTH - 1);
		duration_phase = Tex;
		d_t = Tex / 1000.0 / (RESPIRATION_POINTS_LENGTH / 2);
	}

	pos = pos_at_time[index] * Volume;

	if (index > 0)
	{
		float pos_prev = pos_at_time[index - 1] * Volume;
		float d_pos = pos - pos_prev;
		vel = d_pos / d_t;
	}
	else
		vel = 0;

	accel = vel / d_t;

  jerk = accel / d_t;
}

// Returns the interpolation point calculated at the current elapsed time. Use the methods IncrementTime and ResetTime to 
// change the elapsed time
void RespirationCycleInterpolator::GetInterpolation(double& pos, double& vel)
{
  double accel, jerk;
	GetInterpolationAt(elapsed_time, pos, vel, accel, jerk);
}

void RespirationCycleInterpolator::GetInterpolation(double& pos, double& vel, double &accel)
{
  double jerk;
	GetInterpolationAt(elapsed_time, pos, vel, accel, jerk);
}

void RespirationCycleInterpolator::GetInterpolation(double& pos, double& vel, double &accel, double& jerk)
{
  GetInterpolationAt(elapsed_time, pos, vel, accel, jerk);
}

void RespirationCycleInterpolator::IncrementTime(long t)
{
	elapsed_time += t;

  if(elapsed_time > Tin && !peakReached)
  {
    peakReached = true;

    if(cyclePeakFn != NULL) {
     cyclePeakFn();
    }
  }

  if(elapsed_time > Tin + Tex * 0.9 && !nearCycleComplete)
  {
    nearCycleComplete = true;

    if(nearCycleCompleteFn != NULL) {
     nearCycleCompleteFn();
    }
  }
  

	if (elapsed_time >= T)
	{
		elapsed_time = 0;

		if (queuedParameters)
		{
			SetRespirationParameters(qVolume, qBPM, qIE);
			queuedParameters = false;
		}

   if(cycleCompleteFn != NULL) {
     cycleCompleteFn();
    }

    peakReached = false;
    nearCycleComplete = false;
		
	}
}

void RespirationCycleInterpolator::ResetTime(long t)
{
	elapsed_time = 0;
}

void RespirationCycleInterpolator::PrintRespirationParameters()
{
	Serial.print("TV:");
	Serial.print(Volume);
	Serial.print(", BPM:");
	Serial.print(BPM);
	Serial.print(", IE:");
	Serial.print(IE);
	Serial.print(", T:");
	Serial.print(T);
	Serial.print(", Tin:");
	Serial.print(Tin);
	Serial.print(", Tex:");
	Serial.print(Tex);
	Serial.print(", Vin:");
	Serial.print(Vin);
	Serial.println();
}
