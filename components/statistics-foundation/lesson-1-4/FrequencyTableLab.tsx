"use client";

import { useState } from "react";

export function FrequencyTableLab() {
  const [counts, setCounts] = useState({
    A: 18,
    B: 12,
    AB: 6,
    O: 24,
  });

  const total = counts.A + counts.B + counts.AB + counts.O;
  const maxCount = Math.max(counts.A, counts.B, counts.AB, counts.O, 1);

  const rows = Object.entries(counts).map(([group, count]) => ({
    group,
    count,
    relative: total === 0 ? 0 : count / total,
    percentage: total === 0 ? 0 : (count / total) * 100,
  }));

  function updateCount(group: keyof typeof counts, value: number) {
    setCounts({ ...counts, [group]: value });
  }

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 1
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Build a frequency table and bar chart
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5F5F]">
        Change the category counts. The frequency table, relative frequencies,
        percentages and bar chart update automatically. This shows how raw
        counts become statistical summaries.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {(Object.keys(counts) as Array<keyof typeof counts>).map((group) => (
          <div
            key={group}
            className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-4"
          >
            <label className="text-sm font-black">Blood group {group}</label>
            <input
              type="range"
              min="0"
              max="50"
              value={counts[group]}
              onChange={(event) =>
                updateCount(group, Number(event.target.value))
              }
              className="mt-3 w-full accent-blue-700"
            />
            <p className="mt-2 text-2xl font-black">{counts[group]}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="overflow-x-auto rounded-2xl border border-[#ded9cf] bg-[#FFFCF6]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-[#f8f6f1]">
              <tr>
                <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                  Blood group
                </th>
                <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                  Frequency
                </th>
                <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                  Relative frequency
                </th>
                <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                  Percentage
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.group}
                  className="border-b border-[#ded9cf] last:border-0"
                >
                  <td className="px-4 py-3 font-bold">{row.group}</td>
                  <td className="px-4 py-3">{row.count}</td>
                  <td className="px-4 py-3">{row.relative.toFixed(3)}</td>
                  <td className="px-4 py-3">{row.percentage.toFixed(1)}%</td>
                </tr>
              ))}

              <tr className="bg-[#fbfaf6] font-black">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3">{total}</td>
                <td className="px-4 py-3">{total === 0 ? "0.000" : "1.000"}</td>
                <td className="px-4 py-3">{total === 0 ? "0.0%" : "100.0%"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
          <p className="text-sm font-black">Bar chart</p>

          <div className="mt-5 space-y-4">
            {rows.map((row) => (
              <div key={row.group}>
                <div className="mb-1 flex items-center justify-between text-xs font-bold text-[#5F5F5F]">
                  <span>{row.group}</span>
                  <span>{row.count}</span>
                </div>
                <div className="h-8 rounded-full bg-[#FFFCF6]">
                  <div
                    className="h-8 rounded-full bg-blue-600"
                    style={{
                      width: `${(row.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm leading-7 text-[#5F5F5F]">
            The table gives exact values. The graph makes comparison easier. In
            statistical communication, tables and graphs often work best
            together.
          </p>
        </div>
      </div>
    </div>
  );
}