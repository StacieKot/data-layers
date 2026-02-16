"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLayerPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DataLayerPanel = ({ dataLayers, onLayerToggle, onOpacityChange, }) => {
    const [, forceUpdate] = (0, react_1.useState)(0);
    const rerender = (0, react_1.useCallback)(() => forceUpdate((n) => n + 1), []);
    const handleToggle = (0, react_1.useCallback)((layer) => {
        if (layer.visible) {
            layer.hide();
        }
        else {
            layer.show();
        }
        onLayerToggle?.(layer.id, layer.visible);
        rerender();
    }, [onLayerToggle, rerender]);
    const handleOpacity = (0, react_1.useCallback)((layer, value) => {
        layer.setOpacity(value);
        onOpacityChange?.(layer.id, layer.opacity);
        rerender();
    }, [onOpacityChange, rerender]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: styles.container, children: [(0, jsx_runtime_1.jsx)("h3", { style: styles.title, children: "Data Layers" }), dataLayers.length === 0 && ((0, jsx_runtime_1.jsx)("p", { style: styles.empty, children: "No layers available" })), (0, jsx_runtime_1.jsx)("ul", { style: styles.list, children: dataLayers.map((layer) => ((0, jsx_runtime_1.jsxs)("li", { style: styles.item, children: [(0, jsx_runtime_1.jsxs)("div", { style: styles.row, children: [(0, jsx_runtime_1.jsxs)("label", { style: styles.label, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: layer.visible, onChange: () => handleToggle(layer), style: styles.checkbox }), layer.name] }), (0, jsx_runtime_1.jsxs)("span", { style: styles.badge, children: [layer.features.length, " feature", layer.features.length !== 1 ? "s" : ""] })] }), (0, jsx_runtime_1.jsxs)("div", { style: styles.sliderRow, children: [(0, jsx_runtime_1.jsx)("span", { style: styles.sliderLabel, children: "Opacity" }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: 0, max: 1, step: 0.01, value: layer.opacity, onChange: (e) => handleOpacity(layer, parseFloat(e.target.value)), style: styles.slider, disabled: !layer.visible }), (0, jsx_runtime_1.jsxs)("span", { style: styles.sliderValue, children: [Math.round(layer.opacity * 100), "%"] })] })] }, layer.id))) })] }));
};
exports.DataLayerPanel = DataLayerPanel;
const styles = {
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
//# sourceMappingURL=DataLayerPanel.js.map