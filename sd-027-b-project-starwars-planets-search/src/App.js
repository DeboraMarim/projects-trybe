import React from 'react';
import Filters from './components/TableAndFilters'; // Componente interno
import PlanetsProvider from './Context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <main>
        <Filters />
      </main>
    </PlanetsProvider>
  );
}

export default App;
