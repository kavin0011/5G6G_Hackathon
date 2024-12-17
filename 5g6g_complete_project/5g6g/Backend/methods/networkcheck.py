import matplotlib.pyplot as plt
import matplotlib.animation as animation
from scapy.all import *

# Set up the graph
fig, ax = plt.subplots()
ax.set_xlabel("Time (seconds)")
ax.set_ylabel("I/O Rate (packets/second)")
ax.set_title("I/O Graph")
line, = ax.plot([], [], lw=2)

# Initialize the data lists
timestamps = []
packet_sizes = []
io_rate = []

# Define the update function for the graph
def update(frame):
    global timestamps, packet_sizes, io_rate
    
    # Capture a single packet
    packet = sniff(count=1)[0]
    
    # Extract the packet timestamp and size
    timestamp = packet.time
    packet_size = len(packet)
    
    # Calculate the I/O rate
    if timestamps:
        io_rate.append(packet_size / (timestamp - timestamps[-1]))
    else:
        io_rate.append(0)
    
    # Update the data lists
    timestamps.append(timestamp)
    packet_sizes.append(packet_size)
    
    # Update the graph
    line.set_data(timestamps, io_rate)
    ax.relim()
    ax.autoscale_view()
    return line,

# Create the animation
ani = animation.FuncAnimation(fig, update, interval=100, blit=True)

# Show the graph
plt.show()