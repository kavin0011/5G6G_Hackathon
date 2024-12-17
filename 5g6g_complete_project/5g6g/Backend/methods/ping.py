import subprocess
import pingparsing
import matplotlib.pyplot as plt
import time

# Set up the plot
fig, ax = plt.subplots(2, 1, figsize=(10, 6))
ax[0].set_title('Packet Loss and Sent/Received')
ax[1].set_title('RTT')
ax[0].set_xlabel('Time')
ax[1].set_xlabel('Time')
ax[0].set_ylabel('Packet Loss (%)')
ax[1].set_ylabel('RTT (ms)')

# Initialize lists to store data
packet_loss = []
sent = []
received = []
rtt = []
times = []

while True:
    # Run the ping command
    output = subprocess.check_output(["ping", "-n", "1", "8.8.8.8"])

    # Decode the output from bytes to string
    output = output.decode()

    # Create a PingParsing object
    parser = pingparsing.PingParsing()

    # Parse the output of the ping command
    stats = parser.parse(output)

    # Append data to lists
    packet_loss.append(stats.packet_loss_rate)
    sent.append(stats.packet_transmit)
    received.append(stats.packet_receive)
    rtt.append(stats.rtt_avg)
    times.append(time.time())

    # Clear the plot
    ax[0].cla()
    ax[1].cla()

    # Plot the data
    ax[0].plot(times, packet_loss, label='Packet Loss')
    ax[0].plot(times, sent, label='Sent')
    ax[0].plot(times, received, label='Received')
    ax[0].legend()
    ax[1].plot(times, rtt, label='RTT')
    ax[1].legend()

    # Show the plot
    plt.draw()
    plt.pause(0.1)

plt.show()

# ping.py