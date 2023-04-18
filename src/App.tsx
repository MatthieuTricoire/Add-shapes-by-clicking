import "./App.css";
import { useState } from "react";
import { BiReset, BiUndo, BiRedo } from "react-icons/bi";

interface IShape {
  x: number;
  y: number;
  shapeType: string;
  color?: string;
  borderWidth: string;
}

function App() {
  const [shapes, setShapes] = useState<IShape[]>([]);
  const [color, setColor] = useState<string>("#ffffff");
  const [borderWidth, setBorderWidth] = useState<string>("1");
  const [removedShapes, setRemovedShapes] = useState<IShape[]>([]);
  const [selectedShape, setSelectedShape] = useState<string>("circle");

  function handleChangeShape(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedShape(event.target.value);
  }

  function handleChangeColor(event: React.ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value);
  }

  function handlePlaceShape(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const drawingZone = event.currentTarget;
    const drawingZoneBoundaries = drawingZone.getBoundingClientRect();

    setShapes([
      ...shapes,
      {
        x: clientX - drawingZoneBoundaries.x - 10,
        y: clientY - drawingZoneBoundaries.y - 10,
        shapeType: selectedShape,
        color: color,
        borderWidth: borderWidth,
      },
    ]);
  }

  function handleResetCanvas(): void {
    setShapes([]);
    setRemovedShapes([]);
  }

  function handleBorderWidth(event: React.ChangeEvent<HTMLInputElement>) {
    setBorderWidth(event.target.value);
  }
  function handleUndo(): void {
    const removedShape = shapes.pop();
    if (removedShape) {
      setRemovedShapes([...removedShapes, removedShape]);
    }
  }

  function handleRedo(): void {
    const addShape = removedShapes.pop();
    if (addShape) {
      setShapes([...shapes, addShape]);
    }
  }

  return (
    <>
      <header>
        <h1>Dessine moi une forme </h1>
      </header>

      <main>
        <h2 className="h2">Clique dans la zone pour ajouter une forme</h2>

        <div className="option-grp">
          <div className="option__item">
            <span>Forme : </span>
            <select
              id="shapeType"
              onChange={handleChangeShape}
              value={selectedShape}
            >
              <option value="square">Carré</option>
              <option value="circle">Cercle</option>
            </select>
          </div>
          <div className="option__item">
            <span>Couleur :</span>
            <input
              className="color-picker"
              onChange={handleChangeColor}
              type="color"
              name="color"
              id="color"
              value={color}
            />
          </div>
          <div className="option__item">
            <span>Épaisseur :</span>
            <input
              className="number"
              onChange={handleBorderWidth}
              value={borderWidth}
              type="number"
            />
          </div>
        </div>

        <div className="edit-grp">
          <BiReset
            onClick={shapes.length !== 0 ? handleResetCanvas : undefined}
            size={24}
            color="ffc0ad"
            className="icon--enabled"
          />
          <BiUndo
            onClick={shapes.length !== 0 ? handleUndo : undefined}
            size={24}
            color="ffc0ad"
            className={`icon ${shapes.length !== 0 ? "icon--enabled" : ""}`}
          />
          <BiRedo
            onClick={removedShapes.length !== 0 ? handleRedo : undefined}
            size={24}
            color="ffc0ad"
            className={`icon ${
              removedShapes.length !== 0 ? "icon--enabled" : ""
            }`}
          />
        </div>

        <div className="drawing-area" onClick={handlePlaceShape}>
          {shapes.map((shape, index) => {
            return (
              <div
                key={index}
                className={`shape ${
                  shape.shapeType === "circle" ? "circle" : "square"
                }`}
                style={{
                  top: shape.y + "px",
                  left: shape.x + "px",
                  borderColor: shape.color,
                  borderWidth: +shape.borderWidth,
                }}
              ></div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
