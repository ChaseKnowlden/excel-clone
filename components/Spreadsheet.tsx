'use client'

import React, { useState } from 'react'

type Cell = string
type SpreadsheetProps = {
  rows?: number
  columns?: number
}

const DEFAULT_ROWS = 100
const DEFAULT_COLUMNS = 26

export default function Spreadsheet({
  rows = DEFAULT_ROWS,
  columns = DEFAULT_COLUMNS,
}: Readonly<SpreadsheetProps>) {
  const [data, setData] = useState<Cell[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(''))
  )
  const [editing, setEditing] = useState<{ row: number; col: number } | null>(
    null
  )

  const handleCellChange = (row: number, col: number, value: string) => {
    setData((prev) => {
      const updated = prev.map((arr) => [...arr])
      updated[row][col] = value
      return updated
    })
  }

  return (
    <div className='overflow-auto border rounded-lg bg-[var(--background)] text-[var(--foreground)] shadow-md'>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            <th className='sticky left-0 bg-[var(--background)]'></th>
            {Array.from({ length: columns }, (_, colIdx) => (
              <th
                key={colIdx}
                className='px-2 py-1 font-mono text-xs text-center border-b border-gray-300 bg-gray-50 dark:bg-gray-800'
              >
                {String.fromCharCode(65 + colIdx)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className='font-mono text-xs text-right pr-2 border-r border-gray-300 bg-gray-50 dark:bg-gray-800 sticky left-0'>
                {rowIdx + 1}
              </td>
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className='border border-gray-200 dark:border-gray-700 px-2 py-1 min-w-[80px] h-8 focus-within:ring-2 focus-within:ring-blue-500'
                  onClick={() => setEditing({ row: rowIdx, col: colIdx })}
                >
                  {editing?.row === rowIdx && editing?.col === colIdx ? (
                    <input
                      autoFocus
                      className='w-full bg-transparent outline-none'
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIdx, colIdx, e.target.value)
                      }
                      onBlur={() => setEditing(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Tab') {
                          setEditing(null)
                        }
                      }}
                    />
                  ) : (
                    <span>{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
