"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// PhysicsSensorsContent Component for the new sensor-based experiment
const PhysicsSensorsContent: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State for sensors availability
  const [sensors, setSensors] = useState({
    accelerometer: false,
    gyroscope: false,
    deviceMotion: false,
    deviceOrientation: false,
    geolocation: false,
    ambientLight: false,
    magnetometer: false,
    proximity: false,
    vibration: "unknown",
  });

  // State for sensor readings
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroData, setGyroData] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [geoData, setGeoData] = useState<{
    lat: number | null;
    long: number | null;
    accuracy: number | null;
  }>({
    lat: null,
    long: null,
    accuracy: null,
  });
  const [lightLevel, setLightLevel] = useState(null);
  const [magnetData, setMagnetData] = useState({ x: 0, y: 0, z: 0 });
  const [proximityValue, setProximityValue] = useState(null);

  // State for demo selection
  const [activeDemo, setActiveDemo] = useState("overview");

  // Animation states
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [boxRotation, setBoxRotation] = useState({ x: 0, y: 0, z: 0 });
  const [vibrationPattern, setVibrationPattern] = useState("none");

  // Refs for canvases and animation frames
  const pendulumCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef(null);
  const pendulumAnimationRef = useRef<number | null>(null);
  const waveAnimationRef = useRef<number | null>(null);

  // Check device sensor availability on component mount
  useEffect(() => {
    // Check Accelerometer
    if ("DeviceMotionEvent" in window) {
      setSensors((prev) => ({ ...prev, deviceMotion: true }));

      if ("accelerationIncludingGravity" in DeviceMotionEvent.prototype) {
        setSensors((prev) => ({ ...prev, accelerometer: true }));
      }
    }

    // Check Gyroscope
    if ("DeviceOrientationEvent" in window) {
      setSensors((prev) => ({ ...prev, deviceOrientation: true }));
      if ("gamma" in DeviceOrientationEvent.prototype) {
        setSensors((prev) => ({ ...prev, gyroscope: true }));
      }
    }

    // Check Geolocation
    if ("geolocation" in navigator) {
      setSensors((prev) => ({ ...prev, geolocation: true }));
    }

    // Check Ambient Light Sensor
    if ("AmbientLightSensor" in window) {
      setSensors((prev) => ({ ...prev, ambientLight: true }));
    }

    // Check Magnetometer
    if ("Magnetometer" in window) {
      setSensors((prev) => ({ ...prev, magnetometer: true }));
    }

    // Check Proximity Sensor
    if ("ProximitySensor" in window) {
      setSensors((prev) => ({ ...prev, proximity: true }));
    }

    // Check Vibration
    if ("vibrate" in navigator) {
      setSensors((prev) => ({ ...prev, vibration: "supported" }));
    } else {
      setSensors((prev) => ({ ...prev, vibration: "unsupported" }));
    }
  }, []);

  // Set up event listeners for sensors
  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        setAccelData({
          x:
            parseFloat(
              (event.accelerationIncludingGravity.x ?? 0).toFixed(2)
            ) || 0,
          y:
            parseFloat(
              (event.accelerationIncludingGravity.y ?? 0).toFixed(2)
            ) || 0,
          z:
            parseFloat(
              (event.accelerationIncludingGravity.z ?? 0).toFixed(2)
            ) || 0,
        });
      }
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      setGyroData({
        alpha: parseFloat((event.alpha || 0).toFixed(2)) || 0,
        beta: parseFloat((event.beta || 0).toFixed(2)) || 0,
        gamma: parseFloat((event.gamma || 0).toFixed(2)) || 0,
      });

      // Update box rotation for the 3D demo
      if (activeDemo === "3dbox") {
        setBoxRotation({
          x: event.beta || 0,
          y: event.gamma || 0,
          z: event.alpha || 0,
        });
      }

      // Update ball position for the physics demo
      if (activeDemo === "physics") {
        // Scale and invert as needed for natural ball movement
        const xPos = Math.min(Math.max((event.gamma ?? 0) * 2, -100), 100);
        const yPos = Math.min(Math.max(event.beta ?? 0, -100), 100);

        setBallPosition({ x: xPos, y: yPos });
      }
    };

    // Set up listeners if sensors are available
    if (sensors.deviceMotion) {
      window.addEventListener("devicemotion", handleDeviceMotion);
    }

    if (sensors.deviceOrientation) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    // Clean up listeners
    return () => {
      if (sensors.deviceMotion) {
        window.removeEventListener("devicemotion", handleDeviceMotion);
      }
      if (sensors.deviceOrientation) {
        window.removeEventListener(
          "deviceorientation",
          handleDeviceOrientation
        );
      }
    };
  }, [sensors.deviceMotion, sensors.deviceOrientation, activeDemo]);

  // Set up geolocation
  useEffect(() => {
    let watchId: number;

    if (sensors.geolocation && activeDemo === "geolocation") {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setGeoData({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [sensors.geolocation, activeDemo]);

  // Set up ambient light sensor
  useEffect(() => {
    let lightSensor: { stop: () => void };

    const initLightSensor = async () => {
      try {
        if (sensors.ambientLight && "AmbientLightSensor" in window) {
          const sensor = new (window as any).AmbientLightSensor();
          sensor.onreading = () => {
            setLightLevel(sensor.illuminance);
          };
          sensor.onerror = (event: any) => {
            console.error("Ambient light sensor error:", event);
          };
          await sensor.start();
          lightSensor = sensor;
        }
      } catch (error) {
        console.error("Error initializing light sensor:", error);
      }
    };

    if (activeDemo === "ambientlight") {
      initLightSensor();
    }

    return () => {
      if (lightSensor) {
        lightSensor.stop();
      }
    };
  }, [sensors.ambientLight, activeDemo]);

  // Setup pendulum animation
  useEffect(() => {
    if (activeDemo === "pendulum" && pendulumCanvasRef.current) {
      const canvas = pendulumCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      // Pendulum properties
      let angle = Math.PI / 4; // Initial angle
      let angleVelocity = 0;
      const gravity = 0.0005; // Gravitational constant
      const damping = 0.999; // Damping factor
      const length = 150; // Length of pendulum

      // Starting position (fulcrum of pendulum)
      const originX = width / 2;
      const originY = height / 4;

      const drawPendulum = () => {
        // Apply device orientation if available
        if (sensors.deviceOrientation) {
          // Use gamma (side-to-side tilt) to influence pendulum
          const tiltImpulse = gyroData.gamma / 1000;
          angleVelocity += tiltImpulse;
        }

        // Calculate angular acceleration
        const angleAcceleration = -gravity * Math.sin(angle);

        // Update velocity
        angleVelocity += angleAcceleration;
        angleVelocity *= damping;

        // Update angle
        angle += angleVelocity;

        // Calculate bob position
        const bobX = originX + length * Math.sin(angle);
        const bobY = originY + length * Math.cos(angle);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw pendulum rod
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(bobX, bobY);
        ctx.strokeStyle = isDarkMode ? "#90cdf4" : "#3182ce";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw pendulum bob (circle)
        ctx.beginPath();
        ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? "#4299e1" : "#2b6cb0";
        ctx.fill();

        // Draw fulcrum
        ctx.beginPath();
        ctx.arc(originX, originY, 5, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? "#e2e8f0" : "#1a202c";
        ctx.fill();

        // Request next frame
        pendulumAnimationRef.current = requestAnimationFrame(drawPendulum);
      };

      // Start animation
      pendulumAnimationRef.current = requestAnimationFrame(drawPendulum);

      // Cleanup
      return () => {
        if (pendulumAnimationRef.current) {
          cancelAnimationFrame(pendulumAnimationRef.current);
        }
      };
    }
  }, [activeDemo, sensors.deviceOrientation, gyroData.gamma, isDarkMode]);

  // Setup wave animation
  useEffect(() => {
    if (activeDemo === "wave" && waveCanvasRef.current) {
      const canvas = waveCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      // Wave properties
      let frequency = 0.05;
      let amplitude = 20;
      let phase = 0;

      if (!ctx) return;

      const drawWave = () => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Modify wave properties based on device motion if available
        if (sensors.accelerometer) {
          // Increase amplitude with device movement (z-axis)
          amplitude = 20 + Math.abs(accelData.z * 5);
          // Change frequency with x-axis movement
          frequency = 0.05 + Math.abs(accelData.x / 100);
        }

        // Draw wave
        ctx.beginPath();

        // Move to start of canvas
        ctx.moveTo(0, height / 2);

        // Draw sine wave
        for (let x = 0; x < width; x++) {
          const y = height / 2 + amplitude * Math.sin(frequency * x + phase);
          ctx.lineTo(x, y);
        }

        // Style and stroke
        ctx.strokeStyle = isDarkMode ? "#90cdf4" : "#3182ce";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw particles on the wave
        for (let x = 0; x < width; x += 20) {
          const y = height / 2 + amplitude * Math.sin(frequency * x + phase);

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode ? "#63b3ed" : "#2b6cb0";
          ctx.fill();
        }

        // Update phase for animation
        phase += 0.05;

        // Request next frame
        waveAnimationRef.current = requestAnimationFrame(drawWave);
      };

      // Start animation
      waveAnimationRef.current = requestAnimationFrame(drawWave);

      // Cleanup
      return () => {
        if (waveAnimationRef.current) {
          cancelAnimationFrame(waveAnimationRef.current);
        }
      };
    }
  }, [activeDemo, sensors.accelerometer, accelData, isDarkMode]);

  // Function to request sensor permissions
  const requestSensorPermissions = async () => {
    try {
      // Request permission for device motion and orientation
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        const motionPermission = await (
          DeviceMotionEvent as any
        ).requestPermission();
        if (motionPermission === "granted") {
          setSensors((prev) => ({ ...prev, deviceMotion: true }));
        }
      }

      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        const orientationPermission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (orientationPermission === "granted") {
          setSensors((prev) => ({ ...prev, deviceOrientation: true }));
        }
      }
    } catch (error) {
      console.error("Error requesting sensor permissions:", error);
    }
  };

  // Function to trigger vibration patterns
  const triggerVibration = (pattern: React.SetStateAction<string>) => {
    setVibrationPattern(pattern);

    if (sensors.vibration === "supported") {
      switch (pattern) {
        case "short":
          navigator.vibrate(100);
          break;
        case "long":
          navigator.vibrate(500);
          break;
        case "double":
          navigator.vibrate([100, 50, 100]);
          break;
        case "sos":
          // SOS in Morse code pattern
          navigator.vibrate([
            100, 100, 100, 100, 100, 200, 200, 100, 200, 100, 200, 200, 100,
            100, 100, 100, 100,
          ]);
          break;
        case "escalating":
          navigator.vibrate([50, 50, 100, 50, 150, 50, 200, 50, 250]);
          break;
        case "heartbeat":
          navigator.vibrate([100, 100, 100, 400, 100, 100, 100]);
          break;
        default:
          break;
      }
    }
  };

  // Render helper for sensor availability indicator
  const SensorStatusIndicator = ({
    isAvailable,
    label,
  }: {
    isAvailable: boolean;
    label: string;
  }) => (
    <div className="flex items-center">
      <div
        className={`w-3 h-3 rounded-full mr-2 ${
          isAvailable
            ? isDarkMode
              ? "bg-green-400"
              : "bg-green-500"
            : isDarkMode
            ? "bg-red-400"
            : "bg-red-500"
        }`}
      ></div>
      <span className="text-sm">{label}</span>
    </div>
  );

  // Demo option card component
  const DemoOptionCard = ({
    id,
    title,
    description,
    icon,
    available = true,
  }: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    available?: boolean;
  }) => (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
        ${
          activeDemo === id
            ? isDarkMode
              ? "ring-2 ring-blue-400 bg-blue-900/30"
              : "ring-2 ring-blue-500 bg-blue-50"
            : isDarkMode
            ? "bg-gray-800/50 hover:bg-gray-800"
            : "bg-white hover:bg-gray-50"
        }
        ${!available ? "opacity-50 cursor-not-allowed" : ""}
        shadow-md`}
      onClick={() => available && setActiveDemo(id)}
    >
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div
            className={`p-2 rounded-lg mr-3 ${
              isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
            }`}
          >
            {icon}
          </div>
          <h3
            className={`font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
        </div>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-red-900/80 text-white px-3 py-1 rounded-full text-xs font-medium">
              Sensor Not Available
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Renders each demo based on the active selection
  const renderActiveDemo = () => {
    switch (activeDemo) {
      case "overview":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Available Device Sensors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <SensorStatusIndicator
                  isAvailable={sensors.accelerometer || sensors.deviceMotion}
                  label="Accelerometer"
                />
                <SensorStatusIndicator
                  isAvailable={sensors.gyroscope || sensors.deviceOrientation}
                  label="Gyroscope"
                />
                <SensorStatusIndicator
                  isAvailable={sensors.geolocation}
                  label="Geolocation"
                />
                <SensorStatusIndicator
                  isAvailable={sensors.ambientLight}
                  label="Ambient Light"
                />
                <SensorStatusIndicator
                  isAvailable={sensors.magnetometer}
                  label="Magnetometer"
                />
                <SensorStatusIndicator
                  isAvailable={sensors.proximity}
                  label="Proximity"
                />
                <SensorStatusIndicator
                  isAvailable={sensors.vibration === "supported"}
                  label="Vibration"
                />
              </div>

              {(!sensors.deviceMotion || !sensors.deviceOrientation) && (
                <div className="mt-4">
                  <button
                    onClick={requestSensorPermissions}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      isDarkMode
                        ? "bg-blue-700 hover:bg-blue-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Request Sensor Access
                  </button>
                </div>
              )}
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Welcome to Interactive Physics
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                This interactive lab allows you to explore physics concepts
                using the sensors in your device. Select a demo from below to
                get started with hands-on experiments!
              </p>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Tip:</strong> For the best experience, use a mobile
                device and enable motion sensors.
              </p>
            </div>
          </div>
        );

      case "physics":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Physics Ball Demo
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Tilt your device to move the ball. The ball responds to gravity
                as you tilt, demonstrating physics principles in real time.
              </p>

              <div className="flex flex-col items-center">
                <div
                  className={`relative w-full max-w-sm h-64 rounded-xl ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-100"
                  } overflow-hidden border ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <motion.div
                    className="absolute w-16 h-16 rounded-full shadow-lg"
                    style={{
                      background: isDarkMode
                        ? "radial-gradient(circle at 30% 30%, #3182ce, #1e4e8c)"
                        : "radial-gradient(circle at 30% 30%, #4299e1, #2b6cb0)",
                    }}
                    animate={{
                      x: ballPosition.x,
                      y: ballPosition.y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                </div>

                <div className="mt-6 w-full max-w-sm space-y-2">
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        X-Axis:
                      </span>
                      <span
                        className={`font-mono ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {ballPosition.x.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <span
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Y-Axis:
                      </span>
                      <span
                        className={`font-mono ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {ballPosition.y.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                The Science Behind It
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                This demo illustrates Newton's laws of motion, particularly how
                objects respond to changes in acceleration. As you tilt your
                device, the virtual "gravity" changes direction, causing the
                ball to roll accordingly.
              </p>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
                } border ${
                  isDarkMode ? "border-blue-900/30" : "border-blue-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  Did You Know?
                </h4>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your device contains microelectromechanical systems (MEMS)
                  accelerometers that can detect changes in velocity and
                  orientation by measuring the force exerted on a tiny mass
                  within the sensor.
                </p>
              </div>
            </div>
          </div>
        );

      case "3dbox":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                3D Rotation Demo
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Tilt and rotate your device to control the 3D box. This
                demonstrates how gyroscope data can be used to create
                interactive 3D experiences.
              </p>

              <div className="flex flex-col items-center">
                <div className="relative perspective-800 w-full h-64 flex items-center justify-center">
                  <motion.div
                    className={`relative w-32 h-32 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateX: boxRotation.x,
                      rotateY: boxRotation.y,
                      rotateZ: 0,
                    }}
                  >
                    {/* Front face */}
                    <div
                      className={`absolute w-full h-full border-2 ${
                        isDarkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-100/50"
                      }`}
                      style={{ transform: "translateZ(4rem)" }}
                    />
                    {/* Back face */}
                    <div
                      className={`absolute w-full h-full border-2 ${
                        isDarkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-100/50"
                      }`}
                      style={{ transform: "translateZ(-4rem) rotateY(180deg)" }}
                    />
                    {/* Right face */}
                    <div
                      className={`absolute w-full h-full border-2 ${
                        isDarkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-100/50"
                      }`}
                      style={{ transform: "translateX(4rem) rotateY(90deg)" }}
                    />
                    {/* Left face */}
                    <div
                      className={`absolute w-full h-full border-2 ${
                        isDarkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-100/50"
                      }`}
                      style={{ transform: "translateX(-4rem) rotateY(-90deg)" }}
                    />
                    {/* Top face */}
                    <div
                      className={`absolute w-full h-full border-2 ${
                        isDarkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-100/50"
                      }`}
                      style={{ transform: "translateY(-4rem) rotateX(90deg)" }}
                    />
                    {/* Bottom face */}
                    <div
                      className={`absolute w-full h-full border-2 ${
                        isDarkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-100/50"
                      }`}
                      style={{ transform: "translateY(4rem) rotateX(-90deg)" }}
                    />
                  </motion.div>
                </div>

                {/* Rotation data display */}
                <div className="mt-6 w-full max-w-sm grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <span
                        className={`block text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Beta (X-axis rotation)
                      </span>
                      <span
                        className={`font-mono text-lg ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {gyroData.beta.toFixed(1)}°
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <span
                        className={`block text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Gamma (Y-axis rotation)
                      </span>
                      <span
                        className={`font-mono text-lg ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {gyroData.gamma.toFixed(1)}°
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Understanding Orientation in 3D Space
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                Gyroscopes measure angular velocity around three axes. In mobile
                devices, these readings are typically provided as three angles:
              </p>
              <ul
                className={`list-disc pl-5 mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>
                  <strong>Alpha:</strong> Rotation around the z-axis (compass
                  direction)
                </li>
                <li>
                  <strong>Beta:</strong> Rotation around the x-axis
                  (front-to-back tilt)
                </li>
                <li>
                  <strong>Gamma:</strong> Rotation around the y-axis
                  (side-to-side tilt)
                </li>
              </ul>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                These measurements enable applications like augmented reality,
                gaming, and navigation.
              </p>
            </div>
          </div>
        );

      case "pendulum":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Interactive Pendulum
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Tilt your device side to side to influence the pendulum's
                motion. This demonstrates simple harmonic motion and how
                external forces affect oscillation.
              </p>

              <div className="flex flex-col items-center">
                <canvas
                  ref={pendulumCanvasRef}
                  width={320}
                  height={300}
                  className={`border rounded-lg ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-300"
                  }`}
                />

                {/* Pendulum data */}
                <div className="mt-6 w-full max-w-sm">
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      How It Works
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Tilt your device side-to-side (gamma axis) to add force to
                      the pendulum. The pendulum follows the physics laws of
                      simple harmonic motion with gravity, dampening, and your
                      device's orientation as inputs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                The Physics of Pendulums
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                A pendulum is a weight suspended from a pivot that can swing
                freely. The motion of a pendulum is governed by the following
                principles:
              </p>
              <ul
                className={`list-disc pl-5 mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>
                  The period (time for one complete swing) depends primarily on
                  the pendulum's length
                </li>
                <li>
                  A pendulum's motion can be described using the differential
                  equation: θ″ + (g/L)sin(θ) = 0
                </li>
                <li>
                  For small angles, a pendulum exhibits simple harmonic motion
                </li>
                <li>
                  In real systems, friction and air resistance cause dampening,
                  reducing the amplitude over time
                </li>
              </ul>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-purple-900/20" : "bg-purple-50"
                } border ${
                  isDarkMode ? "border-purple-900/30" : "border-purple-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 ${
                    isDarkMode ? "text-purple-300" : "text-purple-700"
                  }`}
                >
                  Historical Note
                </h4>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Galileo Galilei was one of the first to study pendulums
                  scientifically in the 17th century. He discovered that the
                  period of a pendulum is independent of its amplitude (for
                  small swings) and proposed using pendulums in clocks.
                </p>
              </div>
            </div>
          </div>
        );

      case "wave":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Wave Motion Simulator
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Move your device to affect the wave pattern. The wave's
                amplitude and frequency respond to your device's acceleration,
                demonstrating how energy influences wave characteristics.
              </p>

              <div className="flex flex-col items-center">
                <canvas
                  ref={waveCanvasRef}
                  width={320}
                  height={200}
                  className={`border rounded-lg ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-300"
                  }`}
                />

                {/* Wave data */}
                <div className="mt-6 w-full max-w-sm">
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Device Motion Influence
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } mb-3`}
                    >
                      Move your device to see how acceleration affects the wave:
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          X-axis:{" "}
                        </span>
                        <span
                          className={`font-medium ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {accelData.x} m/s²
                        </span>
                        <span
                          className={`block text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Affects frequency
                        </span>
                      </div>
                      <div>
                        <span
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Z-axis:{" "}
                        </span>
                        <span
                          className={`font-medium ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {accelData.z} m/s²
                        </span>
                        <span
                          className={`block text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Affects amplitude
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                The Science of Waves
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                Waves are disturbances that transfer energy through matter or
                space. Key wave characteristics include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Amplitude
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    The maximum displacement from equilibrium. Higher amplitude
                    means more energy.
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Frequency
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    The number of complete cycles per second, measured in Hertz
                    (Hz).
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Wavelength
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    The distance between successive crests or troughs in a wave.
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Speed
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Wave speed equals frequency times wavelength (v = fλ).
                  </p>
                </div>
              </div>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Waves are fundamental to many physical phenomena, including
                sound, light, and quantum mechanics.
              </p>
            </div>
          </div>
        );

      case "geolocation":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Location-Based Physics
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                This demo showcases how geolocation can be used in physics
                experiments and applications. Your current location determines
                various physical constants that change across Earth's surface.
              </p>

              <div className="flex flex-col">
                {/* Location Data */}
                <div
                  className={`p-5 rounded-lg mb-4 ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h4
                    className={`font-medium mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Your Location Data
                  </h4>

                  {geoData.lat ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span
                            className={`block text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Latitude
                          </span>
                          <span
                            className={`font-mono ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {geoData.lat.toFixed(6)}°
                          </span>
                        </div>
                        <div>
                          <span
                            className={`block text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Longitude
                          </span>
                          <span
                            className={`font-mono ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {geoData.long?.toFixed(6)}°
                          </span>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`block text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Accuracy
                        </span>
                        <span
                          className={`font-mono ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          ±{geoData.accuracy?.toFixed(1)} meters
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`text-center py-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Waiting for location data...
                    </div>
                  )}
                </div>

                {/* Physics constants based on location */}
                {geoData.lat && (
                  <div
                    className={`p-5 rounded-lg border ${
                      isDarkMode
                        ? "border-blue-800 bg-blue-900/20"
                        : "border-blue-100 bg-blue-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      Location-Based Physics Constants
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Gravitational Acceleration
                          </span>
                          <span
                            className={`font-mono font-medium ${
                              isDarkMode ? "text-blue-300" : "text-blue-700"
                            }`}
                          >
                            {(
                              9.78 +
                              0.05 * Math.sin(geoData.lat * (Math.PI / 180))
                            ).toFixed(4)}{" "}
                            m/s²
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Gravity varies slightly with latitude due to Earth's
                          rotation and shape
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Magnetic Field Strength
                          </span>
                          <span
                            className={`font-mono font-medium ${
                              isDarkMode ? "text-blue-300" : "text-blue-700"
                            }`}
                          >
                            {(
                              30 +
                              25 * Math.cos(geoData.lat * (Math.PI / 180))
                            ).toFixed(2)}{" "}
                            µT
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Earth's magnetic field varies by location and is
                          strongest near the poles
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Solar Radiation (Estimate)
                          </span>
                          <span
                            className={`font-mono font-medium ${
                              isDarkMode ? "text-blue-300" : "text-blue-700"
                            }`}
                          >
                            {(
                              1000 -
                              (200 * Math.abs(geoData.lat)) / 90
                            ).toFixed(0)}{" "}
                            W/m²
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Solar radiation is generally stronger near the equator
                          due to more direct sunlight
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Geographic Variations in Physics
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                Many physical constants and phenomena vary depending on your
                location on Earth:
              </p>
              <ul
                className={`list-disc pl-5 mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li>
                  Gravity is stronger at the poles (9.83 m/s²) than at the
                  equator (9.78 m/s²)
                </li>
                <li>
                  Magnetic field lines run parallel to Earth's surface at the
                  equator and perpendicular at the poles
                </li>
                <li>
                  The Coriolis effect (which influences weather patterns) varies
                  with latitude
                </li>
                <li>
                  Atmospheric pressure decreases with altitude (about 1 kPa per
                  100m)
                </li>
              </ul>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                These variations have practical implications for precise
                scientific measurements, navigation, and engineering.
              </p>
            </div>
          </div>
        );

      case "haptics":
        return (
          <div className="space-y-6">
            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Haptic Feedback Patterns
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-6`}
              >
                Experience different vibration patterns that can be used to
                communicate physical phenomena through touch. Haptic feedback
                adds another dimension to science education.
              </p>

              {sensors.vibration === "supported" ? (
                <div className="flex flex-col items-center">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                    {[
                      {
                        name: "Short Pulse",
                        id: "short",
                        description: "Single brief vibration",
                      },
                      {
                        name: "Long Pulse",
                        id: "long",
                        description: "Sustained vibration",
                      },
                      {
                        name: "Double Tap",
                        id: "double",
                        description: "Two quick pulses",
                      },
                      {
                        name: "SOS Pattern",
                        id: "sos",
                        description: "Morse code emergency signal",
                      },
                      {
                        name: "Escalating",
                        id: "escalating",
                        description: "Increasing intensity pattern",
                      },
                      {
                        name: "Heartbeat",
                        id: "heartbeat",
                        description: "Mimics cardiac rhythm",
                      },
                    ].map((pattern) => (
                      <div
                        key={pattern.id}
                        onClick={() => triggerVibration(pattern.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all
                          ${
                            vibrationPattern === pattern.id
                              ? isDarkMode
                                ? "bg-purple-900/30 border-purple-700"
                                : "bg-purple-100 border-purple-300"
                              : isDarkMode
                              ? "bg-gray-900 border-gray-700 hover:bg-gray-800"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }
                        `}
                      >
                        <h4
                          className={`font-medium mb-1 ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {pattern.name}
                        </h4>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {pattern.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-6 p-4 rounded-lg w-full ${
                      isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Current Pattern
                    </h4>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          vibrationPattern !== "none"
                            ? isDarkMode
                              ? "bg-green-400"
                              : "bg-green-500"
                            : isDarkMode
                            ? "bg-gray-600"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        {vibrationPattern === "none"
                          ? "None"
                          : `${
                              vibrationPattern.charAt(0).toUpperCase() +
                              vibrationPattern.slice(1)
                            } pattern activated`}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-6 text-center rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3
                    className={`text-lg font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Vibration Not Supported
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Your device does not support the Vibration API required for
                    this demo.
                  </p>
                </div>
              )}
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-md`}
            >
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Haptics in Science Education
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-4`}
              >
                Haptic feedback provides tactile information that can enhance
                understanding of physics concepts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Force Representation
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Vibration intensity can represent force magnitude, helping
                    students intuitively feel Newton's laws.
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Wave Properties
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Vibration patterns can demonstrate frequency, amplitude, and
                    interference of waves.
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Accessibility
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Haptic feedback makes physics more accessible to students
                    with visual impairments.
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h5
                    className={`font-medium mb-1 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Reinforced Learning
                  </h5>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Multi-sensory experiences create stronger neural connections
                    and improve concept retention.
                  </p>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
                } border ${
                  isDarkMode ? "border-blue-900/30" : "border-blue-100"
                }`}
              >
                <h4
                  className={`font-medium mb-2 ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  Research Application
                </h4>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Researchers are developing sophisticated haptic systems that
                  can simulate complex physics phenomena like fluid dynamics,
                  electromagnetic fields, and quantum mechanical behaviors,
                  making abstract concepts tangible.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={`p-6 rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            } shadow-md`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Select a Demo
            </h3>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-4`}
            >
              Choose one of the interactive demos from the options above to
              explore physics with your device's sensors.
            </p>
          </div>
        );
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-200`}
    >
      {/* Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
      <main className="container mx-auto pt-24 px-4 space-y-24 pb-16">
        <div className="space-y-10">
          {/* Hero Section */}
          <div
            className={`relative overflow-hidden rounded-xl ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-900 via-purple-950 to-indigo-900"
                : "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-500"
            } p-8 text-white shadow-lg`}
          >
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <svg
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm1 5h-2v6h2zm0 8h-2v2h2z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-4">
                Interactive Physics Lab
              </h2>
              <p className="max-w-3xl text-lg mb-6">
                Experience physics principles through your device's sensors.
                This virtual lab uses accelerometers, gyroscopes, and other
                sensors to create interactive demonstrations of fundamental
                physics concepts.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={requestSensorPermissions}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition
                bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm`}
                >
                  Enable Sensors
                </button>
                <a
                  href="#experiments"
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition
                bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm`}
                >
                  View Experiments
                </a>
              </div>
            </div>
          </div>

          {/* Introduction Section */}
          <div
            className={`rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            <div className="flex items-center mb-4">
              <div
                className={`p-2 rounded-lg ${
                  isDarkMode ? "bg-blue-900/40" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className={`text-xl font-bold ml-3 ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                About This Lab
              </h3>
            </div>

            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Modern mobile devices contain an array of sophisticated sensors
                that can be used to measure and interact with the physical
                world. This virtual lab leverages these sensors to demonstrate
                key physics concepts through hands-on experiments.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4
                    className={`font-semibold mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Available Sensors
                  </h4>
                  <ul
                    className={`space-y-2 mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <li className="flex items-start">
                      <span
                        className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                          isDarkMode
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        ✓
                      </span>
                      <span>
                        <strong>Accelerometer:</strong> Measures acceleration
                        forces including gravity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                          isDarkMode
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        ✓
                      </span>
                      <span>
                        <strong>Gyroscope:</strong> Detects rotation and
                        orientation changes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                          isDarkMode
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        ✓
                      </span>
                      <span>
                        <strong>Geolocation:</strong> Determines physical
                        position on Earth
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span
                        className={`inline-flex items-center justify-center rounded-full h-5 w-5 text-xs mr-2 ${
                          isDarkMode
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        ✓
                      </span>
                      <span>
                        <strong>Vibration:</strong> Provides haptic feedback
                        patterns
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4
                    className={`font-semibold mb-3 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    How To Use This Lab
                  </h4>
                  <ol
                    className={`space-y-2 list-decimal list-inside ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <li>Grant sensor permissions when prompted</li>
                    <li>Select an experiment from the options below</li>
                    <li>
                      Move, tilt, or rotate your device to interact with the
                      experiment
                    </li>
                    <li>
                      Observe how your device's motion affects the physics
                      simulation
                    </li>
                    <li>
                      Read the accompanying explanations to understand the
                      underlying science
                    </li>
                  </ol>
                  <p
                    className={`mt-4 text-sm ${
                      isDarkMode ? "text-amber-300" : "text-amber-700"
                    }`}
                  >
                    <strong>Note:</strong> For the best experience, use a mobile
                    device. Some features may not be available on desktop
                    computers or older mobile devices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experiments Section */}
          <div className="space-y-6" id="experiments">
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Available Experiments
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DemoOptionCard
                id="overview"
                title="Sensor Overview"
                description="Check which sensors are available on your device and see their real-time readings."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                }
              />

              <DemoOptionCard
                id="physics"
                title="Physics Ball"
                description="Tilt your device to control a virtual ball that responds to simulated gravity."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                }
                available={sensors.deviceOrientation}
              />

              <DemoOptionCard
                id="3dbox"
                title="3D Rotation"
                description="Experience 3D rotation by tilting and turning your device to control a 3D object."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                }
                available={sensors.deviceOrientation}
              />

              <DemoOptionCard
                id="pendulum"
                title="Interactive Pendulum"
                description="Influence a pendulum's motion by tilting your device, demonstrating simple harmonic motion."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                available={sensors.deviceOrientation}
              />

              <DemoOptionCard
                id="wave"
                title="Wave Simulator"
                description="Affect wave properties by moving your device, seeing how energy translates to frequency and amplitude."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                }
                available={sensors.accelerometer || sensors.deviceMotion}
              />

              <DemoOptionCard
                id="geolocation"
                title="Location Physics"
                description="See how your location on Earth affects physics constants like gravity and magnetic fields."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                available={sensors.geolocation}
              />

              <DemoOptionCard
                id="haptics"
                title="Haptic Patterns"
                description="Experience different vibration patterns that can represent physics phenomena through touch."
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
                available={sensors.vibration === "supported"}
              />
            </div>
          </div>

          {/* Active Experiment Area */}
          <div
            className={`rounded-xl shadow-md overflow-hidden border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`p-5 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg ${
                    isDarkMode ? "bg-indigo-900/40" : "bg-indigo-100"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-xl font-bold ml-3 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Active Experiment
                </h3>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActiveDemo()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sensor Data Display */}
          {activeDemo !== "overview" &&
            (sensors.deviceMotion || sensors.deviceOrientation) && (
              <div
                className={`rounded-xl overflow-hidden shadow-md border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`p-5 border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h3
                    className={`font-bold ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Raw Sensor Data
                  </h3>
                </div>

                <div className="p-6 overflow-x-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sensors.accelerometer && (
                      <div
                        className={`p-4 rounded-lg ${
                          isDarkMode ? "bg-gray-900" : "bg-gray-50"
                        }`}
                      >
                        <h4
                          className={`font-medium mb-2 ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Accelerometer
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span
                              className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              X-axis:
                            </span>
                            <span
                              className={`font-mono ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {accelData.x} m/s²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span
                              className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              Y-axis:
                            </span>
                            <span
                              className={`font-mono ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {accelData.y} m/s²
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span
                              className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              Z-axis:
                            </span>
                            <span
                              className={`font-mono ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {accelData.z} m/s²
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {sensors.gyroscope && (
                      <div
                        className={`p-4 rounded-lg ${
                          isDarkMode ? "bg-gray-900" : "bg-gray-50"
                        }`}
                      >
                        <h4
                          className={`font-medium mb-2 ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Gyroscope
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span
                              className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              Alpha:
                            </span>
                            <span
                              className={`font-mono ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {gyroData.alpha}°
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span
                              className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              Beta:
                            </span>
                            <span
                              className={`font-mono ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {gyroData.beta}°
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span
                              className={
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }
                            >
                              Gamma:
                            </span>
                            <span
                              className={`font-mono ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            >
                              {gyroData.gamma}°
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* Resources Section */}
          <div
            className={`rounded-xl shadow-md p-6 border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Learning Resources
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Further Reading */}
              <div>
                <h4
                  className={`font-semibold mb-3 flex items-center ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Further Reading
                </h4>
                <ul
                  className={`space-y-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {[
                    "Physics for Scientists and Engineers by Serway and Jewett",
                    "Sensors for Mobile Devices: Theory and Applications",
                    "Haptic Technology in Education: Enhancing STEM Learning",
                    "Interactive Physics Simulations: Principles and Design",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                          isDarkMode ? "bg-blue-400" : "bg-blue-500"
                        }`}
                      ></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Experiments */}
              <div>
                <h4
                  className={`font-semibold mb-3 flex items-center ${
                    isDarkMode ? "text-green-300" : "text-green-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Related Experiments
                </h4>
                <ul
                  className={`space-y-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {[
                    "Newton's Laws of Motion",
                    "Rotational Kinematics",
                    "Wave Mechanics and Interference",
                    "Magnetic Fields and Electromagnets",
                    "Planetary Motion and Gravity",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                          isDarkMode ? "bg-green-400" : "bg-green-500"
                        }`}
                      ></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PhysicsSensorsContent;
