var expect = chai.expect;

describe('example', function() {

  describe('usage', function() {
    it('should have invoice property', function() {
      yamlFile = window.__JSON__['specs.yaml'];
      expect(yamlFile['invoice']).to.equal(34843);
      expect(yamlFile['tax']).to.equal(251.42);
      expect(yamlFile['total']).to.equal(4443.52);
      expect(yamlFile['tax']).to.equal(251.42);
      expect(yamlFile['total']).to.equal(4443.52);
    });

    it('should have date property', function() {
      yamlFile = window.__JSON__['specs.yaml'];
      expect(yamlFile['date']).to.equal('2001-01-23T00:00:00.000Z');
    });

    it('should have bill property', function() {
      yamlFile = window.__JSON__['specs.yaml'];
      expect(yamlFile['bill-to']).to.have.property('given').and.equal('Chris');
      expect(yamlFile['bill-to']).to.have.property('family').and.equal('Dumars');
      expect(yamlFile['ship-to']).to.have.property('given').and.equal('Chris');
      expect(yamlFile['ship-to']).to.have.property('family').and.equal('Dumars');
      expect(yamlFile['comments']).to.equal('Late afternoon is best. Backup contact is Nancy Billsmer @ 338-4338.\n');
    });

    it('should have product property', function() {
      yamlFile = window.__JSON__['specs.yaml'];
      product = yamlFile['product'];

      expect(product[0]).to.have.property('sku').and.equal('BL394D');
      expect(product[0]).to.have.property('quantity').and.equal(4);
      expect(product[0]).to.have.property('description').and.equal('Basketball');
      expect(product[0]).to.have.property('price').and.equal(450.00);

      expect(product[1]).to.have.property('sku').and.equal('BL4438H');
      expect(product[1]).to.have.property('quantity').and.equal(1);
      expect(product[1]).to.have.property('description').and.equal('Super Hoop');
      expect(product[1]).to.have.property('price').and.equal(2392.00);
    });

    it('should have product property', function() {
      yamlFile = window.__JSON__['specs.yaml'];
      address = yamlFile['bill-to']['address'];
      expect(address).to.have.property('lines').and.equal('458 Walkman Dr.\nSuite #292\n');
      expect(address).to.have.property('city').and.equal('Royal Oak');
      expect(address).to.have.property('state').and.equal('MI');
      expect(address).to.have.property('postal').and.equal(48046);
    });

  });

});
