"use client";

import { useEffect } from 'react';

const Page = () => {
    const sizex = 80;
    const sizey = 160;
    const EMPTY = 0;
    let elements: HTMLTableCellElement[][] = [];
    let cells: number[][] = [];

    const createField = () => {
        elements = [];
        cells = [];

        const table = document.getElementById("gol") as HTMLTableElement;

        table.innerHTML = '';
        for (let x = 0; x < sizex; x++) {
            const tr = document.createElement('tr');
            let tdElements: HTMLTableCellElement[] = [];

            cells.push(new Array(sizey).fill(EMPTY));
            elements.push(tdElements);

            table?.appendChild(tr);

            for (let y = 0; y < sizey; y++) {
                const td = document.createElement("td");
                tdElements.push(td);
                tr.appendChild(td);
            }
        }
    }
    const draw = () => {
        for (let x = 0; x < sizex; x++) {
            for (let y = 0; y < sizey; y++) {
                elements[x][y].setAttribute('class', 'cell ' + (cells[x][y] === 1 ? "filled" : "empty"));
            }
        }
    }

    const init = () => {
        createField();
        for (let x = 0; x < sizex; x++) {
            for (let y = 0; y < sizey; y++) {
                cells[x][y] = Math.random() < 0.5 ? 1 : 0;
            }
        }

        draw();
        setInterval(newGeneration, 150);
    }

    const countNeighbours = (x: number, y: number): number => {
        let count = 0;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < sizex && ny >= 0 && ny < sizey) {
                    count += cells[nx][ny];
                }
            }
        }

        return count;
    }

    const newGeneration = () => {
        const newCells: number[][] = [];

        for (let i = 0; i < sizex; i++) {
            newCells.push(new Array(sizey).fill(EMPTY));
        }

        for (let x = 0; x < sizex; x++) {
            for (let y = 0; y < sizey; y++) {
                const neighbours: number = countNeighbours(x, y);

                if (cells[x][y] === EMPTY && neighbours === 3) {
                    newCells[x][y] = 1;
                } else if (cells[x][y] === 1 && (neighbours === 3 || neighbours === 2)) {
                    newCells[x][y] = 1;
                } else {
                    newCells[x][y] = EMPTY;
                }
            }
        }
        cells = [];
        cells = newCells;
        draw();
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="bg-[#060604] w-[100%] h-full flex items-center justify-center">
            <table id="gol" className="transition ease-in-out">
            </table>
        </div>
    )
}

export default Page;
