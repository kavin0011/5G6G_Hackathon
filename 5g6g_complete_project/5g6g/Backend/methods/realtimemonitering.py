import psutil
import time

def monitor_network_usage_by_traffic(interval=1, duration=10, max_bandwidth_mbps=100):
    # print(f"{'Time':<10}{'Traffic (%)':<15}")
    
    # Record initial values
    start_time = time.time()
    net_io_start = psutil.net_io_counters()
    bytes_sent_start = net_io_start.bytes_sent
    bytes_recv_start = net_io_start.bytes_recv
    
    while time.time() - start_time < duration:
        time.sleep(interval)
    
    # Record final values
    net_io_end = psutil.net_io_counters()
    bytes_sent_end = net_io_end.bytes_sent
    bytes_recv_end = net_io_end.bytes_recv
    
    # Calculate total traffic during the interval (in bits)
    total_bytes_sent = bytes_sent_end - bytes_sent_start
    total_bytes_recv = bytes_recv_end - bytes_recv_start
    total_bits = (total_bytes_sent + total_bytes_recv) * 8
    
    # Convert maximum bandwidth to bits (since 1 Mbps = 1,000,000 bits)
    max_bandwidth_bits_per_sec = max_bandwidth_mbps * 1_000_000
    
    # Calculate total possible traffic over the duration in bits
    total_possible_traffic_bits = max_bandwidth_bits_per_sec * duration
    
    # Calculate percentage usage
    traffic_percentage = (total_bits / total_possible_traffic_bits) * 100
    return traffic_percentage
    
    # print(f"{time.strftime('%H:%M:%S'):<10}{traffic_percentage:.2f}%")
    
# Example usage, assuming 100 Mbps maximum bandwidth
# monitor_network_usage(interval=1, duration=10, max_bandwidth_mbps=100)
