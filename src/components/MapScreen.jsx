import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import MapCanvas from './MapCanvas';
import InfoCard from './InfoCard';
import BottomMenu from './BottomMenu';

export default function MapScreen({ deviceView = 'desktop' }) {
  const selectedLotId = useStore(state => state.selectedLotId);
  const fetchLotsData = useStore(state => state.fetchLotsData);
  const loading = useStore(state => state.loading);
  const error = useStore(state => state.error);

  useEffect(() => {
    fetchLotsData();
  }, [fetchLotsData]);

  return (
    <div className="w-full h-[100dvh] bg-[#D8E2E1] overflow-hidden flex flex-col">
      {/* Contenedor del mapa - scroll nativo */}
      <div className="flex-1 overflow-auto">
        <MapCanvas />
        
        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-[#D8E2E1]/80 flex items-center justify-center z-40">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-azul4 border-t-transparent rounded-full animate-spin" />
              <span className="text-azul4 font-nexa font-bold text-sm tracking-wider">CARGANDO LOTES...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="fixed top-4 left-4 right-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 z-40">
            <p className="text-red-700 text-sm font-nexa text-center">{error}</p>
          </div>
        )}

        {/* Floating UI - Desktop */}
        {selectedLotId && deviceView === 'desktop' && (
          <div className="fixed z-50 pointer-events-none bottom-0 left-0 w-full">
            <InfoCard isDesktop={true} />
          </div>
        )}

        {/* Floating UI - Mobile/Tablet */}
        {selectedLotId && deviceView !== 'desktop' && (
          <div className="fixed z-50 pointer-events-none bottom-[70px] left-0">
            <InfoCard isDesktop={false} />
          </div>
        )}
      </div>

      {/* Bottom Menu - siempre visible */}
      <div className="shrink-0">
        <BottomMenu />
      </div>
    </div>
  );
}