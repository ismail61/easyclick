import React from 'react'
import '../../assets/css/tableBody.css'

export default function HtmlTable({columns, data}) {
  return (
    <table>
        <tr>
          {columns.map((column, index) => (
            <th>{column.title}</th>
          ))}
        </tr>
        {data.map((row, index) => (
          <tr>
            {columns.map((column, index) => (
              <td>{row[column.field]}</td>
            ))}
          </tr>
        ))}
    </table>
  )
}