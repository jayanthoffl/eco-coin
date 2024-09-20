import React, { useState, useEffect } from "react";
import "./Carbonemi.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const CarbonFootprintCalculator = () => {
  const [electricity, setElectricity] = useState("");
  const [flightDistance, setFlightDistance] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");
  const [waterUsage, setWaterUsage] = useState("");
  const [wasteGenerated, setWasteGenerated] = useState("minimal");
  const [foodChoice, setFoodChoice] = useState("veg");
  const [transportMode, setTransportMode] = useState("public_transport");
  const [shoppingChoice, setShoppingChoice] = useState("minimal");
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState([]);

  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleCalculateFootprint = () => {
    if (!electricity || !flightDistance || !fuelConsumption || !waterUsage) {
      setError("Please provide valid inputs for all fields.");
      return;
    }

    setError("");

    const electricityEmissions = electricity * 0.92;
    const flightEmissions = flightDistance * 0.254;
    const fuelEmissions = fuelConsumption * 2.31;
    const waterEmissions = waterUsage * 0.003;
    const wasteEmissions =
      wasteGenerated === "minimal"
        ? 50
        : wasteGenerated === "average"
        ? 100
        : 150;

    const totalEmissions =
      electricityEmissions +
      flightEmissions +
      fuelEmissions +
      waterEmissions +
      wasteEmissions;

    setCarbonEmissions(totalEmissions);

    generateAnswer({
      question: `Your emitted ${totalEmissions.toFixed(
        2
      )} kg CO₂ this month. How can I reduce my carbon footprint?`,
    });
  };

  const generateAnswer = async ({ question }) => {
    if (!isLoggedIn) {
      toast.error("Please login to ask a question!", {
        className: "toast-error",
      });
      return;
    }

    if (!question.trim()) {
      toast.error("Question cannot be empty!", { className: "toast-error" });
      return;
    }

    setConversation((prev) => [...prev, { question, answer: "Loading..." }]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA5JJjL91dFTbFAbuBnnQWwT0Hh0CWJLIs",
        { contents: [{ parts: [{ text: question }] }] }
      );
      const answer = response.data.candidates[0].content.parts[0].text;
      setConversation((prev) =>
        prev.map((conv, index) =>
          index === prev.length - 1
            ? { ...conv, answer: parseAnswer(answer) }
            : conv
        )
      );
    } catch (error) {
      setConversation((prev) =>
        prev.map((conv, index) =>
          index === prev.length - 1
            ? { ...conv, answer: "Error generating answer" }
            : conv
        )
      );
      toast.error("There was an error generating the answer!", {
        className: "toast-error",
      });
      console.error("There was an error!", error);
    }
  };

  const parseAnswer = (answer) => {
    // Split the answer by "*" to handle line breaks
    const lines = answer.split("*");

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        // Heading (if wrapped in "**")
        const headingText = trimmedLine.slice(2, -2);
        return (
          <h3 key={index} className="answer-heading">
            {headingText}
          </h3>
        );
      } else if (trimmedLine) {
        // Normal paragraph text
        return (
          <p key={index} className="answer-text">
            {trimmedLine}
          </p>
        );
      } else {
        return null;
      }
    });
  };

  const data = [
    { name: "Electricity", value: electricity * 0.92 || 0 },
    { name: "Flight", value: flightDistance * 0.254 || 0 },
    { name: "Fuel", value: fuelConsumption * 2.31 || 0 },
    { name: "Water", value: waterUsage * 0.003 || 0 },
    {
      name: "Waste",
      value:
        wasteGenerated === "minimal"
          ? 50
          : wasteGenerated === "average"
          ? 100
          : 150,
    },
  ];

  return (
    <div className="mainContainer">
      <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Carbon Footprint Calculator</h1>

        {/* Input Fields */}
        <div style={{ marginBottom: "20px" }}>
          <label>Electricity Usage (kWh per month):</label>
          <input
            type="number"
            placeholder="Enter kWh"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            style={{ margin: "10px 0", padding: "15px", width: "100%" }}
          />
          <p>Average electricity use per month: ~150 kWh</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Flight Distance (km):</label>
          <input
            type="number"
            placeholder="Enter distance in km"
            value={flightDistance}
            onChange={(e) => setFlightDistance(e.target.value)}
            style={{ margin: "10px 0", padding: "15px", width: "100%" }}
          />
          <p>
            Average flight distance per month for frequent travelers: ~1,000 km
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Fuel Consumption (liters per month):</label>
          <input
            type="number"
            placeholder="Enter fuel usage"
            value={fuelConsumption}
            onChange={(e) => setFuelConsumption(e.target.value)}
            style={{ margin: "10px 0", padding: "15px", width: "100%" }}
          />
          <p>Average fuel consumption for a car: ~6 liters per 100 km</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Water Usage (liters per month):</label>
          <input
            type="number"
            placeholder="Enter water usage"
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            style={{ margin: "10px 0", padding: "15px", width: "100%" }}
          />
          <p>Average water use per month: ~12,000 liters</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Food Choice:</label>
          <select
            value={foodChoice}
            onChange={(e) => setFoodChoice(e.target.value)}
            style={{ padding: "15px", width: "100%" }}
          >
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>
          <p>Average vegetarian meal carbon impact: ~2 kg CO₂ per day</p>
          <p>Average non-vegetarian meal carbon impact: ~6 kg CO₂ per day</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Transportation Mode:</label>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            style={{ padding: "15px", width: "100%" }}
          >
            <option value="public_transport">Public Transport</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="electric_vehicle">Electric Vehicle</option>
            <option value="auto">Auto</option>
          </select>
          <p>
            Public transport emits less CO₂ compared to cars (~0.1 kg CO₂ per km
            for buses)
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Shopping Habits:</label>
          <select
            value={shoppingChoice}
            onChange={(e) => setShoppingChoice(e.target.value)}
            style={{ padding: "15px", width: "100%" }}
          >
            <option value="minimal">Minimal Shopping</option>
            <option value="average">Average Shopping</option>
            <option value="frequent">Frequent Shopping</option>
          </select>
          <p>
            Average carbon footprint per month from shopping (clothes, goods):
            ~50-200 kg CO₂
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Waste Generated:</label>
          <select
            value={wasteGenerated}
            onChange={(e) => setWasteGenerated(e.target.value)}
            style={{ padding: "15px", width: "100%" }}
          >
            <option value="minimal">Minimal Waste</option>
            <option value="average">Average Waste</option>
            <option value="high">High Waste</option>
          </select>
          <p>Minimal waste generated: ~50 kg CO₂ per month</p>
          <p>Average waste generated: ~100 kg CO₂ per month</p>
          <p>High waste generated: ~150 kg CO₂ per month</p>
        </div>

        <button
          onClick={handleCalculateFootprint}
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Calculate Footprint
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Carbon Emissions and Suggestions */}
      <div className="result">
        {carbonEmissions !== null && (
          <div className="bar">
            <h3>Your Carbon Emissions:</h3>
            <p className="co">{carbonEmissions.toFixed(2)} kg CO₂</p>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="value" fill="var(--green)" barSize={60} />
              </BarChart>
            </ResponsiveContainer>

            {/* Conversation Area */}
            <div>
              <h3 className="sugg">Suggestions to Reduce Carbon Emissions</h3>
              {conversation.map((conv, index) => (
                <div key={index} className="conversation-item">
                  <strong>{conv.question}</strong>
                  <div>{conv.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default CarbonFootprintCalculator;
