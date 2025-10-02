'use client'

import React, { useState, useRef } from 'react'

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
  const [colWidths, setColWidths] = useState<number[]>(Array(columns).fill(100))
  const [rowHeights, setRowHeights] = useState<number[]>(Array(rows).fill(32))
  const resizingCol = useRef<number | null>(null)
  const resizingRow = useRef<number | null>(null)
  const startX = useRef<number>(0)
  const startY = useRef<number>(0)
  const startWidth = useRef<number>(0)
  const startHeight = useRef<number>(0)

  // Column resizing
  const handleResizeStart = (e: React.MouseEvent, colIdx: number) => {
    resizingCol.current = colIdx
    startX.current = e.clientX
    startWidth.current = colWidths[colIdx]
    document.addEventListener('mousemove', handleResizing)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  const handleResizing = (e: MouseEvent) => {
    if (resizingCol.current !== null) {
      const delta = e.clientX - startX.current
      setColWidths((prev) => {
        const updated = [...prev]
        updated[resizingCol.current!] = Math.max(40, startWidth.current + delta)
        return updated
      })
    }
    if (resizingRow.current !== null) {
      const delta = e.clientY - startY.current
      setRowHeights((prev) => {
        const updated = [...prev]
        updated[resizingRow.current!] = Math.max(
          20,
          startHeight.current + delta
        )
        return updated
      })
    }
  }

  const handleResizeEnd = () => {
    resizingCol.current = null
    resizingRow.current = null
    document.removeEventListener('mousemove', handleResizing)
    document.removeEventListener('mouseup', handleResizeEnd)
  }

  // Row resizing
  const handleRowResizeStart = (e: React.MouseEvent, rowIdx: number) => {
    resizingRow.current = rowIdx
    startY.current = e.clientY
    startHeight.current = rowHeights[rowIdx]
    document.addEventListener('mousemove', handleResizing)
    document.addEventListener('mouseup', handleResizeEnd)
  }

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
                style={{ width: colWidths[colIdx] }}
                className='relative px-2 py-1 font-mono text-xs text-center border-b border-gray-300 bg-gray-50 dark:bg-gray-800 group'
              >
                <span>{String.fromCharCode(65 + colIdx)}</span>
                <span
                  className='absolute right-0 top-0 h-full w-2 cursor-col-resize group-hover:bg-blue-100 dark:group-hover:bg-blue-900'
                  onMouseDown={(e) => handleResizeStart(e, colIdx)}
                  style={{ zIndex: 10 }}
                ></span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                height: rowHeights[rowIdx],
                minHeight: rowHeights[rowIdx],
              }}
            >
              <td className='relative font-mono text-xs text-right pr-2 border-r border-gray-300 bg-gray-50 dark:bg-gray-800 sticky left-0 select-none'>
                {rowIdx + 1}
                <span
                  className='absolute left-0 bottom-0 w-full h-2 cursor-row-resize bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900'
                  onMouseDown={(e) => handleRowResizeStart(e, rowIdx)}
                  style={{ zIndex: 10 }}
                ></span>
              </td>
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    width: colWidths[colIdx],
                    minWidth: colWidths[colIdx],
                  }}
                  className='border border-gray-200 dark:border-gray-700 px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500'
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
