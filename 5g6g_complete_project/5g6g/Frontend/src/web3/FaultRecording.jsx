import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Base64 } from 'js-base64';  // Base64 encoding library
import './web3.css';

const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "faultId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "faultType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "severity",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "encodedData",
				"type": "string"
			}
		],
		"name": "FaultRecordStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_faultType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_severity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_encodedData",
				"type": "string"
			}
		],
		"name": "storeFaultRecord",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "faultRecords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "faultId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "faultType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "severity",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "encodedData",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_faultId",
				"type": "uint256"
			}
		],
		"name": "getFaultRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "faultId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "faultType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "severity",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "encodedData",
						"type": "string"
					}
				],
				"internalType": "struct FaultRecordStorage.FaultRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_faultType",
				"type": "string"
			}
		],
		"name": "getFaultRecordByName",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "faultId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "faultType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "severity",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "encodedData",
						"type": "string"
					}
				],
				"internalType": "struct FaultRecordStorage.FaultRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalFaultRecords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = "0x0621fEdCac839F0fCE7d2D58EE7952ec6F70E979";



const FaultRecording = ({ currentInput, risk ,onBack}) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [faultRecords, setFaultRecords] = useState([]);
  const [faultType, setFaultType] = useState('');
  const [severity, setSeverity] = useState('');
  const [hash, setHash] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchFaultType, setSearchFaultType] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
          const totalFaultRecords = await contractInstance.methods.getTotalFaultRecords().call();
          setTotalRecords(Number(totalFaultRecords));
        } catch (error) {
          console.error("Error loading blockchain data: ", error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    loadBlockchainData();
  }, []);

  useEffect(() => {
    setFaultType(currentInput);
    setSeverity(risk);
  }, [currentInput, risk]);

  const storeFaultRecord = async (e) => {
    e.preventDefault();
    if (contract && faultType && severity && hash) {
      try {
        const encodedHash = Base64.encode(hash);
        await contract.methods.storeFaultRecord(faultType, severity, encodedHash).send({ from: account });
        alert('Fault record stored successfully!');
        const totalFaultRecords = await contract.methods.getTotalFaultRecords().call();
        setTotalRecords(Number(totalFaultRecords));
        let records = [];
        for (let i = 0; i < totalFaultRecords; i++) {
          const record = await contract.methods.getFaultRecord(i).call();
          records.push(record);
        }
        setFaultRecords(records);
      } catch (error) {
        console.error("Error storing fault record: ", error);
      }
    } else {
      alert('Please fill all fields!');
    }
  };

  const searchFaultRecord = async (e) => {
    e.preventDefault();
    if (contract && searchFaultType) {
      try {
        const result = await contract.methods.getFaultRecordByName(searchFaultType).call();
        const decodedResult = {
          faultId: Number(result.faultId),
          faultType: result.faultType,
          severity: result.severity,
          timestamp: new Date(Number(result.timestamp) * 1000).toLocaleString(),
          encodedData: Base64.decode(result.encodedData),
        };
        setSearchResult(decodedResult);
      } catch (error) {
        console.error("Error searching fault record: ", error);
        alert("Fault record not found!");
      }
    } else {
      alert('Please enter a fault name to search!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto ml-96 p-8 bg-gray-700 rounded-lg shadow-lg">
		<button onClick={onBack} className="mb-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
        Back
      </button>
      <h1 className="text-3xl font-bold text-center mb-6">Fault Record Storage</h1>
      <p className="text-lg font-semibold text-gray-700 mb-4">Connected Account: {account}</p>

      {/* Form to store a new fault record */}
      <form className="space-y-4" onSubmit={storeFaultRecord}>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Fault Type:</label>
          <input
            type="text"
            value={faultType}
            onChange={(e) => setFaultType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Severity:</label>
          <input
            type="text"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Solution:</label>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Store Fault Record
        </button>
      </form>

      {/* Search form */}
      <form className="mt-6 space-y-4" onSubmit={searchFaultRecord}>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Search Fault Type:</label>
          <input
            type="text"
            value={searchFaultType}
            onChange={(e) => setSearchFaultType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Enter fault type"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
          Search Fault Record
        </button>
      </form>

      {/* Display total fault records */}
      <h3 className="text-xl font-bold mt-8">Total Fault Records: {totalRecords}</h3>

      {/* Display stored fault records */}
      <ul className="mt-6 space-y-4">
        {faultRecords.map((record, index) => (
          <li key={index} className="p-4 bg-gray-900 shadow-sm rounded-md">
            <p><strong>ID:</strong> {Number(record.faultId)}</p>
            <p><strong>Type (Encoded):</strong> {record.faultType}</p>
            <p><strong>Severity (Encoded):</strong> {record.severity}</p>
            <p><strong>Timestamp:</strong> {new Date(Number(record.timestamp) * 1000).toLocaleString()}</p>
            <p><strong>Solution (Decoded):</strong> {Base64.decode(record.encodedData)}</p>
          </li>
        ))}
      </ul>

      {/* Display search result */}
      {searchResult && (
        <div className="mt-6 p-4 bg-gray-900 rounded-md">
          <h3 className="text-lg font-semibold">Search Result:</h3>
          <p><strong>ID:</strong> {searchResult.faultId}</p>
          <p><strong>Type:</strong> {searchResult.faultType}</p>
          <p><strong>Severity:</strong> {searchResult.severity}</p>
          <p><strong>Timestamp:</strong> {searchResult.timestamp}</p>
          <p><strong>Solution (Decoded):</strong> {searchResult.encodedData}</p>
        </div>
      )}
    </div>
  );
};

export default FaultRecording;
