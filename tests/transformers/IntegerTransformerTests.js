import IntegerTransformer from '../../lib/transformers/IntegerTransformer';
import { assert } from 'chai';

describe( 'IntegerTransformer', function(){

	it( 'works with default settings and integery values', async function(){
		const transformer = new IntegerTransformer( { name: 'integer' } );

		assert.equal( transformer.transform( 1 ), 1 );
		assert.equal( transformer.transform( 1.1 ), 1 );
		assert.equal( transformer.transform( 1.9 ), 1 );
		assert.equal( transformer.transform( '1' ), 1 );
		assert.equal( transformer.transform( '1.1' ), 1 );
		assert.equal( transformer.transform( '1.9' ), 1 );
		assert.equal( transformer.transform( ' 1  ' ), 1 );
		assert.equal( transformer.transform( ' 1.1   ' ), 1 );
		assert.equal( transformer.transform( ' 1.9  ' ), 1 );
	});

	it( 'works with default settings and non-integery values', async function(){
		const transformer = new IntegerTransformer( { name: 'integer' } );

		assert.isNull( transformer.transform( 'a' ) );
		assert.isNull( transformer.transform( NaN ) );
		assert.isNull( transformer.transform( Infinity ) );
	});
	
	it( 'allows overriding the default value', async function(){
		const transformer = new IntegerTransformer( {
			name: 'integer',
			defaultValue: -1
		});

		assert.equal( transformer.transform( '1' ), 1 );
		assert.equal( transformer.transform( 'a' ), -1 );
		assert.equal( transformer.transform( NaN ), -1 );
		assert.equal( transformer.transform( Infinity ), -1 );
	});

	it( 'allows providing min and max values', async function(){
		const transformer = new IntegerTransformer( {
			name: 'integer',
			minValue: 5,
			maxValue: 20
		});

		assert.strictEqual( transformer.transform( '4' ), 5 );
		assert.strictEqual( transformer.transform( '5' ), 5 );
		assert.strictEqual( transformer.transform( '6' ), 6 );
		assert.strictEqual( transformer.transform( '19' ), 19 );
		assert.strictEqual( transformer.transform( '20' ), 20 );
		assert.strictEqual( transformer.transform( '21' ), 20 );
	});

	it( 'allows regex', async function(){
		const transformer = new IntegerTransformer( {
			name: 'integer',
			regex: {
				match: /^-(\d+)-$/gi,
				replace: '$1'
			},
			minValue: 5,
			maxValue: 20
		});

		assert.strictEqual( transformer.transform( '-4-' ), 5 );
		assert.strictEqual( transformer.transform( '-5-' ), 5 );
		assert.strictEqual( transformer.transform( '-20-' ), 20 );
		assert.strictEqual( transformer.transform( '-21-' ), 20 );
	});
	
});