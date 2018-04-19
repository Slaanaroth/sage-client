/* file : ask-operator.js
MIT License

Copyright (c) 2018 Thomas Minier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict'

const { TransformIterator } = require('asynciterator')

/**
 * A AskOperator output True if a source iterator has solutions, false otherwise.
 * results are outputed following the SPARQL XML results format
 * @extends TransformIterator
 * @author Thomas Minier
 */
class AskOperator extends TransformIterator {
  /**
   * Constructor
   * @param {AsyncIterator} source - Source iterator
   */
  constructor (source) {
    super(source.take(1))
    this._noResults = true
  }

  get cardinality () {
    return 1
  }

  _transform (bindings, done) {
    this._noResults = false
    this._push('<?xml version="1.0"?>\n<sparql xmlns="http://www.w3.org/2005/sparql-results#">\n\t<boolean>true</boolean>\n</sparql>\n')
    done()
  }

  _flush (done) {
    if (this._noResults) {
      this._push('<?xml version="1.0"?>\n<sparql xmlns="http://www.w3.org/2005/sparql-results#">\n\t<boolean>false</boolean>\n</sparql>\n')
    }
    done()
  }
}

module.exports = AskOperator
