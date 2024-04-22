describe('PokeAPI Tests', () => {
    const baseUrl = 'https://pokeapi.co/api/v2';
  
    it('Success - Get Pokemon Types API', () => {
      const pokemonId = 30; // Random Pokemon ID
      cy.request(`${baseUrl}/pokemon/${pokemonId}`).then((response) => {
        expect(response.status).to.eq(200);
        const pokemonName = response.body.name;
        cy.request(`${baseUrl}/pokemon-species/${pokemonId}`).then((speciesResponse) => {
          const pokemonNameFromTypesApi = speciesResponse.body.name;
          expect(pokemonNameFromTypesApi).to.eq(pokemonName);
          cy.log(`Name consistency check passed for Pokemon ID ${pokemonId}: ${pokemonNameFromTypesApi}`);
        });
      });
    });
  
    it('Success - Get Pokemon API', () => {
      const pokemonId = 123; // random Pokemon ID
      cy.request(`${baseUrl}/pokemon/${pokemonId}`).then((response) => {
        expect(response.status).to.eq(200);
        const types = response.body.types.map((typeData) => typeData.type.name);
        const pokemonName = response.body.name;
        cy.log(`Pokemon ID: ${pokemonId}, Types: ${types}, Name: ${pokemonName}`);
      });
    });
  
    it('Success - no data available', () => {
      const pokemonId = 100123123123; // Assuming Pokemon ID 100123123123 does not exist
      cy.request({
        url: `${baseUrl}/pokemon/${pokemonId}`,
        failOnStatusCode: false // Prevent Cypress from failing the test on non-200 status
      }).then((response) => {
        expect(response.status).to.eq(404);
        cy.log(`Pokemon with ID ${pokemonId} does not exist`);
      });
    });
  
    it('Error - server error', () => {
      cy.request({
        url: `${baseUrl}/wrongendpoint`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        cy.log('Server error test passed: Endpoint not found');
      });
    });

    it('Check name consistency for Pokemon ID 27', () => {
        const pokemonId = 27;
        cy.request(`${baseUrl}/pokemon/${pokemonId}`).then((response) => {
          const pokemonNameFromPokemonApi = response.body.name;
          cy.request(`${baseUrl}/pokemon-species/${pokemonId}`).then((speciesResponse) => {
            const pokemonNameFromTypesApi = speciesResponse.body.name;
            expect(pokemonNameFromTypesApi).to.eq(pokemonNameFromPokemonApi);
            cy.log(`Name consistency check passed for Pokemon ID ${pokemonId}: ${pokemonNameFromTypesApi}`);
          });
        });
      });
  
    it('Bonus: Testing for multiple Pokemon IDs', () => {
      const pokemonIds = Cypress._.sampleSize(Cypress._.range(1, 1000), 10); // Randomly select 10 Pokemon IDs from 1 to 1000
      pokemonIds.forEach((id) => {
        cy.request(`${baseUrl}/pokemon/${id}`).then((response) => {
          expect(response.status).to.eq(200);
          const types = response.body.types.map((typeData) => typeData.type.name);
          const pokemonName = response.body.name;
          cy.log(`Pokemon ID: ${id}, Types: ${types}, Name: ${pokemonName}`);
        });
      });
    });
  });
  