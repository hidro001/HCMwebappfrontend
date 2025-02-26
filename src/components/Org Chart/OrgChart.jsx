import React, { useEffect, useRef, useContext } from "react";
import BalkangraphOrgChart from "@balkangraph/orgchart.js";
import { motion } from "framer-motion";
import { ThemeContext } from "../../hooks/ThemeContext";

const OrgChart = ({ nodes = [], clinks = [] }) => {
  const { theme } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the OrgChart only once
    if (!chartRef.current) {
      // Optionally define/override a custom template
      BalkangraphOrgChart.templates.green = {
        ...BalkangraphOrgChart.templates.ana,
        size: [250, 150],
        node: '<rect x="0" y="0" height="{h}" width="{w}" fill="#679903" stroke-width="2" stroke="#333333" rx="10" ry="10"></rect>',
        img_0:
          '<clipPath id="{randId}"><circle cx="50" cy="50" r="40"></circle></clipPath>' +
          '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" ' +
          'xlink:href="{val}" x="5" y="5" width="90" height="90"></image>',
        field_0:
          '<text data-width="150" style="font-size: 16px;" fill="#ffffff" x="110" y="30" text-anchor="start">{val}</text>',
        field_1:
          '<text data-width="150" style="font-size: 14px;" fill="#ffffff" x="110" y="55" text-anchor="start">{val}</text>',
        field_2:
          '<text data-width="150" style="font-size: 12px;" fill="#ffffff" x="110" y="80" text-anchor="start">Managers: {val}</text>',
        link: '<path stroke="#333333" stroke-width="2" fill="none" d="{rounded}" />',
      };

      // Define a custom "clink" template for dotted lines
      BalkangraphOrgChart.clinkTemplates.simple = {
        link: '<path stroke="#333333" stroke-dasharray="4" stroke-width="2" fill="none" d="{d}" />',
      };

      // Create the chart
      const chart = new BalkangraphOrgChart(containerRef.current, {
        template: "green",
        // backgroundColor / bgColor removed
        enableSearch: false,
        nodeBinding: {
          field_0: "name",
          field_1: "title",
          field_2: "managers",
          img_0: "img",
        },
        nodeSpacing: 60,
        levelSpacing: 50,
      });

      chartRef.current = chart;
    }

    // Load nodes/clinks whenever they change
    if (chartRef.current && nodes.length > 0) {
      chartRef.current.config.clinks = clinks;
      chartRef.current.load(nodes);
      chartRef.current.draw();
    }
  }, [nodes, clinks]);

  useEffect(() => {
  
  }, [theme]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
      id="orgchart-container"
      className="w-full h-full"
    />
  );
};

export default OrgChart;
