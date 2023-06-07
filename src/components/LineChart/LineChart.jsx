import React, { Component } from "react";
import * as d3 from "d3";
import "./LineChart.css";

class LineChart extends Component {
  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    const { data } = this.props;

    if (!data || data.length === 0) {
      return;
    }

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.time)))
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const lineSoilMoisture = d3
      .line()
      .x((d) => xScale(new Date(d.time)))
      .y((d) => yScale(d.soilMoisture));

    const lineTemperature = d3
      .line()
      .x((d) => xScale(new Date(d.time)))
      .y((d) => yScale(d.temperature));

    const lineHumidity = d3
      .line()
      .x((d) => xScale(new Date(d.time)))
      .y((d) => yScale(d.humidity));

    d3.select(this.chartRef).selectAll("svg").remove();

    const svg = d3
      .select(this.chartRef)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineSoilMoisture);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", lineTemperature);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", lineHumidity);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.bottom)
      .attr("fill", "#000")
      .text("Time");

    // Add y-axis
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height / 2)
      .attr("dy", "1em")
      .attr("fill", "#000")
      .text("Range");
  }

  render() {
    return (
      <div className="line-chart" ref={(ref) => (this.chartRef = ref)}>
        {/* Chart container */}
      </div>
    );
  }
}

export default LineChart;
