import React from "react";
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
export declare const DataLayerPanel: React.FC<DataLayerPanelProps>;
export {};
//# sourceMappingURL=DataLayerPanel.d.ts.map