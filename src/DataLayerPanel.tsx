import React, { useState, useCallback } from "react";

interface DataLayer {
  id: string;
  visible: boolean;
  name: string;
  hide: () => void;
  show: () => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  features: {
    id: string;
  }[];
}

export interface DataLayerPanelProps {
  dataLayers: DataLayer[];
  onLayerToggle?: (layerId: string, visible: boolean) => void;
  onOpacityChange?: (layerId: string, opacity: number) => void;
}

export const DataLayerPanel: React.FC<DataLayerPanelProps> = ({
  dataLayers,
  onLayerToggle,
  onOpacityChange,
}) => {
  const [, forceUpdate] = useState(0);

  const rerender = useCallback(() => forceUpdate((n) => n + 1), []);

  const handleToggle = useCallback(
    (layer: DataLayer) => {
      if (layer.visible) {
        layer.hide();
      } else {
        layer.show();
      }
      onLayerToggle?.(layer.id, layer.visible);
      rerender();
    },
    [onLayerToggle, rerender],
  );

  const handleOpacity = useCallback(
    (layer: DataLayer, value: number) => {
      layer.setOpacity(value);
      onOpacityChange?.(layer.id, layer.opacity);
      rerender();
    },
    [onOpacityChange, rerender],
  );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Data Layers</h3>
      {dataLayers.length === 0 && (
        <p style={styles.empty}>No layers available</p>
      )}
      <ul style={styles.list}>
        {dataLayers.map((layer) => (
          <li key={layer.id} style={styles.item}>
            <div style={styles.row}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={layer.visible}
                  onChange={() => handleToggle(layer)}
                  style={styles.checkbox}
                />
                {layer.name}
              </label>
              <span style={styles.badge}>
                {layer.features.length} feature
                {layer.features.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div style={styles.sliderRow}>
              <span style={styles.sliderLabel}>Opacity</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={layer.opacity}
                onChange={(e) =>
                  handleOpacity(layer, parseFloat(e.target.value))
                }
                style={styles.slider}
                disabled={!layer.visible}
              />
              <span style={styles.sliderValue}>
                {Math.round(layer.opacity * 100)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "'Inter', system-ui, sans-serif",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    maxWidth: 360,
    backgroundColor: "#fff",
  },
  title: {
    margin: "0 0 12px",
    fontSize: 16,
    fontWeight: 600,
    color: "#1a202c",
  },
  empty: {
    color: "#a0aec0",
    fontSize: 14,
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  item: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f7fafc",
    border: "1px solid #edf2f7",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#2d3748",
    cursor: "pointer",
  },
  checkbox: {
    width: 16,
    height: 16,
    cursor: "pointer",
  },
  badge: {
    fontSize: 12,
    color: "#718096",
    backgroundColor: "#edf2f7",
    padding: "2px 8px",
    borderRadius: 10,
  },
  sliderRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#a0aec0",
    minWidth: 48,
  },
  slider: {
    flex: 1,
    cursor: "pointer",
  },
  sliderValue: {
    fontSize: 12,
    color: "#4a5568",
    minWidth: 36,
    textAlign: "right",
  },
};
