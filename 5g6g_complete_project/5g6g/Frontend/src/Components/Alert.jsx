import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from 'axios';

function Alert() {
  const headings = [
    "Duration",
    "Protocol Type",
    "Service",
    "Flag",
    "Source Bytes",
    "Destination Bytes",
    "Land",
    "Wrong Fragment",
    "Urgent",
    "Hot",
    "Failed Logins",
    "Logged In",
    "Compromised",
    "Root Shell",
    "Su Attempted",
    "Num Root",
    "Num File Creations",
    "Num Shell Prompts",
    "Num Access Files",
    "Num Outbound Cmds",
    "Is Host Login",
    "Is Guest Login",
    "Count",
    "Srv Count",
    "Serror Rate",
    "Srv Serror Rate",
    "Rerror Rate",
    "Srv Rerror Rate",
    "Same Srv Rate",
    "Diff Srv Rate",
    "Srv Diff Host Rate",
    "Dst Host Count",
    "Dst Host Srv Count",
    "Dst Host Same Srv Rate",
    "Dst Host Diff Srv Rate",
    "Dst Host Same Src Port Rate",
    "Dst Host Srv Diff Host Rate",
    "Dst Host Serror Rate",
  ];

  const problemData = {
    back: {
      name: 'back',
      description: 'Typically involves backdoor access to systems, enabling attackers to bypass authentication and gain persistent unauthorized access.',
      risk: 'High Risk',
    },
    buffer_overflow: {
      name: 'buffer_overflow',
      description: 'Exploits vulnerabilities to execute arbitrary code, often leading to system compromise, data leaks, or privilege escalation.',
      risk: 'High Risk',
    },
    ftp_write: {
      name: 'ftp_write',
      description: 'If an attacker can write to FTP, they could upload malicious files, leading to potential compromise or misuse of the system.',
      risk: 'Medium to High Risk',
    },
    guess_passwd: {
      name: 'guess_passwd',
      description: 'Brute-force attempts to guess passwords can succeed if weak passwords are used, leading to account compromise.',
      risk: 'Medium Risk',
    },
    imap: {
      name: 'imap',
      description: 'Vulnerabilities in the IMAP protocol could lead to data exposure, particularly for email services.',
      risk: 'Medium Risk',
    },
    ipsweep: {
      name: 'ipsweep',
      description: 'Network reconnaissance to identify live hosts. While not an attack by itself, it is a precursor to more serious threats.',
      risk: 'Low to Medium Risk',
    },
    land: {
      name: 'land',
      description: 'A denial of service (DoS) attack that sends spoofed packets, causing network disruption.',
      risk: 'Medium Risk',
    },
    loadmodule: {
      name: 'loadmodule',
      description: 'This exploits module loading vulnerabilities, potentially leading to privilege escalation or remote code execution.',
      risk: 'High Risk',
    },
    multihop: {
      name: 'multihop',
      description: 'Refers to attacks using multiple network hops, potentially evading detection, and compromising systems.',
      risk: 'Medium Risk',
    },
    neptune: {
      name: 'neptune',
      description: 'A form of DoS attack (SYN Flood), it can overwhelm systems, leading to service outages.',
      risk: 'High Risk',
    },
    nmap: {
      name: 'nmap',
      description: 'Network scanning tool used to identify open ports and services. Often used in the reconnaissance phase of attacks.',
      risk: 'Low Risk',
    },
    normal: {
      name: 'normal',
      description: 'Represents normal traffic, posing no threat.',
      risk: 'No Risk',
    },
    perl: {
      name: 'perl',
      description: 'Exploits involving the Perl scripting language, potentially leading to arbitrary code execution if vulnerabilities are present.',
      risk: 'Medium Risk',
    },
    phf: {
      name: 'phf',
      description: 'Exploits related to the PHF CGI script (Common Gateway Interface), potentially allowing unauthorized access.',
      risk: 'Medium Risk',
    },
    pod: {
      name: 'pod',
      description: 'A Ping of Death (PoD) DoS attack that sends malformed packets, disrupting network operations.',
      risk: 'Medium Risk',
    },
    portsweep: {
      name: 'portsweep',
      description: 'A scanning activity to identify open ports, often used in conjunction with ipsweep. It indicates reconnaissance behavior.',
      risk: 'Low to Medium Risk',
    },
    rootkit: {
      name: 'rootkit',
      description: 'Malicious software designed to hide the presence of an attacker, giving them long-term access with elevated privileges.',
      risk: 'High Risk',
    },
    satan: {
      name: 'satan',
      description: 'A network scanner that identifies vulnerabilities in network services, often preceding an attack.',
      risk: 'Medium Risk',
    },
    smurf: {
      name: 'smurf',
      description: 'A distributed denial-of-service (DDoS) attack that uses ICMP to flood the target network.',
      risk: 'High Risk',
    },
    spy: {
      name: 'spy',
      description: 'Involves network surveillance, such as packet sniffing or keylogging, to gather sensitive information.',
      risk: 'Medium Risk',
    },
    teardrop: {
      name: 'teardrop',
      description: 'A DoS attack that sends fragmented packets, leading to crashes or system instability.',
      risk: 'Medium to High Risk',
    },
    warezclient: {
      name: 'warezclient',
      description: 'Unauthorized downloading of pirated software, posing risks primarily to intellectual property.',
      risk: 'Low to Medium Risk',
    },
    warezmaster: {
      name: 'warezmaster',
      description: 'Unauthorized distribution of pirated software, which may involve compromised systems for storage or delivery.',
      risk: 'Medium Risk',
    },
  };
  // const [current, setCurrent] = useState("Normal");
  const [curRow, setCurRow] = useState([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [dataValues, setDataValues] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegion, setSelectedSubRegion] = useState("");
  
  const [currentInput, setCurrentInput] = useState("normal");
  // useEffect(() => {
  //   // Blink effect if the currentInput is not "normal"
  //   if (currentInput !== "normal") {
  //     setIsBlinking(true);
  //     const blinkInterval = setInterval(() => {
  //       setIsBlinking((prev) => !prev);
  //     }, 100);
  //     return () => clearInterval(blinkInterval);
  //   }
  //   setIsBlinking(false);
  // }, [currentInput]);

  const fetchCombinedData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict_attack');
      const { attack_type, cur_row } = response.data;
      setCurrentInput(attack_type);
      // setCurrent(attack_type);
      setCurRow(cur_row);
      console.log(attack_type);
      console.log(cur_row);
    } catch (error) {
      console.error("Error fetching attack data from backend:", error);
    }
  };

  // useEffect(() => {
    const handleclick=()=>{
      fetchCombinedData(); // Fetch the data on component mount
    }
  // }, []);

  const problemDetail = problemData[currentInput] || null; // Set to null if key is not found

  const riskColorMap = {
    "High Risk": "red",
    "Medium Risk": "orange",
    "Low Risk": "yellow",
    "No Risk": "white",
  };

  const chartData = {
    labels: ["Risk Level"],
    datasets: [
      {
        data: [100],
        backgroundColor: problemDetail ? riskColorMap[problemDetail.risk] : "white",
        hoverBackgroundColor: problemDetail ? riskColorMap[problemDetail.risk] : "white",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="grid grid-cols-9 gap-4">
        {/* Left Column */}
        <div className="col-span-2 bg-gray-800 p-4 rounded-lg flex flex-col h-full">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-2 bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Select Region</h2>
              <select
                className="w-full bg-gray-600 p-2 rounded"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                <option value="region1">Region 1</option>
                <option value="region2">Region 2</option>
              </select>

              <h2 className="text-lg font-semibold mt-4 mb-2">Select Sub-Region</h2>
              <select
                className="w-full bg-gray-600 p-2 rounded"
                value={selectedSubRegion}
                onChange={(e) => setSelectedSubRegion(e.target.value)}
              >
                <option value="">Select Sub-Region</option>
                <option value="subregion1">Sub-Region 1</option>
                <option value="subregion2">Sub-Region 2</option>
              </select>
            </div>

            <div className="flex-2 bg-gray-600 p-4 rounded-lg flex items-center justify-center">
              <Pie data={chartData} />
            </div>
            <button onClick={handleclick}>Check</button>
          </div>
        </div>

        {/* Middle Column */}
        <div
          className={`col-span-4 bg-gray-700 p-4 transition-all duration-500 rounded-lg ${isBlinking ? "animate-pulse border-4 border-red-600" : ""}`}
        >
          <h2 className={`text-3xl font-bold text-center mb-4 ${problemDetail ? (problemDetail.risk === "High Risk" ? "text-red-500" : problemDetail.risk === "Medium Risk" ? "text-orange-400" : problemDetail.risk === "Low Risk" ? "text-yellow-400" : "text-white") : "text-white"}`}>
            {currentInput === "normal" ? "NORMAL" : problemDetail ? problemDetail.name.toUpperCase() : "UNKNOWN"}
          </h2>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <div className="bg-gray-600 p-4 rounded mb-4">
                <p>
                  <strong>Description:</strong> {problemDetail ? problemDetail.description : "No description available."}
                </p>
              </div>
              <button
                className={`mt-auto p-2 rounded-lg ${problemDetail ? (problemDetail.risk === "High Risk" ? "bg-red-500" : problemDetail.risk === "Medium Risk" ? "bg-orange-500" : problemDetail.risk === "Low Risk" ? "bg-yellow-500" : "bg-green-500") : "bg-gray-500"}`}
              >
                {problemDetail ? problemDetail.risk : "No Risk"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 bg-gray-600 p-4">
          <h2>Parameters</h2>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-gray-500 p-4 overflow-y-auto rounded-lg">
              <ul>
                {headings.slice(0, Math.ceil(headings.length / 2)).map((heading) => (
                  <li key={heading} className="my-2">
                    <strong>{heading}:</strong> {curRow[headings.indexOf(heading)] || "0"}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-500 p-4 overflow-y-auto rounded-lg">
              <ul>
                {headings.slice(Math.ceil(headings.length / 2)).map((heading) => (
                  <li key={heading} className="my-2">
                    <strong>{heading}:</strong> {curRow[headings.indexOf(heading)] || "0"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
