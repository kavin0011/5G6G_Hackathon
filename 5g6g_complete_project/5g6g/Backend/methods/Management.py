import psutil
import time

def monitor_network_usage(interval=1):
    net_io = psutil.net_io_counters()
    time.sleep(interval)
    
    new_net_io = psutil.net_io_counters()
    sent_per_sec = (new_net_io.bytes_sent - net_io.bytes_sent) / interval
    recv_per_sec = (new_net_io.bytes_recv - net_io.bytes_recv) / interval

    # print(sent_per_sec , recv_per_sec)
    return {
        "sent_per_sec": sent_per_sec,
        "recv_per_sec": recv_per_sec
    }

# monitor_network_usage()