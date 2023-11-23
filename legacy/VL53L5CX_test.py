import time
import numpy
import vl53l5cx_ctypes as vl53l5cx
from vl53l5cx_ctypes import STATUS_RANGE_VALID, STATUS_RANGE_VALID_LARGE_PULSE, STATUS_RANGE_NOWRAP 

print("Uploading firmware, please wait...")
vl53 = vl53l5cx.VL53L5CX()
print("Done!")
vl53.set_resolution(8*8)
vl53.set_ranging_frequency_hz(15)
vl53.set_ranging_mode(1)
#vl53.set_integration_time_ms(50)
#vl53.set_sharpener_percent(5)
vl53.set_target_order(1)



vl53.start_ranging()

while True:
    if vl53.data_ready():
        data = vl53.get_data()
        distanceraw = numpy.array(data.distance_mm, dtype=numpy.float64)[0, 4:16].reshape((3, 4))

        # 2d array of good ranging data
        status = numpy.isin(numpy.array(data.target_status)[0, 4:16].reshape((3, 4)), (STATUS_RANGE_VALID, STATUS_RANGE_VALID_LARGE_PULSE, STATUS_RANGE_NOWRAP))
        distancevalid = numpy.multiply(distanceraw, status)
        
        # substitute zeros for 4000)
        distancevalid[distancevalid == 0] = 4000

        # Display the depth matrix in ASCII form
        print("Depth Matrix (in mm):")
        for row in distancevalid:
            for val in row:
                print(f"{val:6}", end=" ")
            print()
        
        # clear output
        print("\033c", end="")
        
    time.sleep(0.1)
