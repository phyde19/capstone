import React, { useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BenchmarkDemo = () => {
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const divRef = useRef(null);

  const runBenchmark = () => {
    setIsRunning(true);
    setResults([]);
    
    const iterations = 1000000;
    const warmupIterations = 1000;
    
    // Warm-up
    for (let i = 0; i < warmupIterations; i++) {
      divRef.current.textContent;
      let dummy = 0;
    }

    // Benchmark DOM access
    const startDom = performance.now();
    for (let i = 0; i < iterations; i++) {
      divRef.current.textContent;
    }
    const endDom = performance.now();
    const domTime = endDom - startDom;

    // Benchmark JS variable access
    let jsVar = divRef.current.textContent;
    const startJs = performance.now();
    for (let i = 0; i < iterations; i++) {
      let dummy = jsVar;
    }
    const endJs = performance.now();
    const jsTime = endJs - startJs;

    setResults([
      { name: 'DOM Access', time: domTime },
      { name: 'JS Variable', time: jsTime }
    ]);
    setIsRunning(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">DOM vs JS Access Benchmark</h1>
      <div ref={divRef} className="hidden">Benchmark content</div>
      <button 
        onClick={runBenchmark}
        disabled={isRunning}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {isRunning ? 'Running...' : 'Run Benchmark'}
      </button>
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <p>DOM Access: {results[0].time.toFixed(2)} ms</p>
            <p>JS Variable: {results[1].time.toFixed(2)} ms</p>
            <p className="font-bold">Difference: {(results[0].time / results[1].time).toFixed(2)}x faster</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenchmarkDemo;