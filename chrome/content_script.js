(function () {
  'use strict';

  function compareNumbers(a, b) {
    return a - b;
  }

  function appendModule(items, sold, success, currency, median) {
    let temp = document.getElementsByClassName('x-refine__body')[0];
    let element = document.createElement('div');
    let fragment = document.createDocumentFragment();
    if (!temp) {
      temp = document.getElementById('LeftNavContainer');
    }
    if (!temp) {
      return;
    }
    element.className = 'info';
    element.textContent = 'Items: ' + items;
    fragment.appendChild(element);
    element = document.createElement('div');
    element.className = 'info';
    element.textContent = 'Sold: ' + sold + ' (' + success + '%)';
    fragment.appendChild(element);
    element = document.createElement('div');
    element.className = 'info';
    element.textContent = 'Trending at: ' + currency + median;
    fragment.appendChild(element);
    element = document.createElement('div');
    element.className = 'slrinfo';
    element.appendChild(fragment);
    fragment.appendChild(element);
    element = document.createElement('div');
    element.className = 'rct_cm';
    element.appendChild(fragment);
    fragment.appendChild(element);
    element = document.createElement('div');
    element.className = 'rct_c';
    element.appendChild(fragment);
    fragment.appendChild(element);
    element = document.createElement('h2');
    element.setAttribute('style', 'margin:0');
    element.className = 'rct_head';
    element.textContent = 'Item Information';
    fragment.insertBefore(element, fragment.firstChild);
    element = document.createElement('div');
    element.className = 'sellerInfo rct';
    element.appendChild(fragment);
    fragment.appendChild(element);
    element = document.createElement('div');
    if (temp.id !== 'LeftNavContainer') {
      element.className = 'scandal-placement';
    } else {
      element.className = 'modules';
    }
    element.appendChild(fragment);
    fragment.appendChild(element);
    if (temp.id === 'LeftNavContainer') {
      element = document.createElement('div');
      element.className = 'rtm-mb15px rtm-mt15px';
      fragment.appendChild(element);
    }
    temp.parentNode.insertBefore(fragment, temp.nextSibling);
  }

  function main() {
    let currency = {
      'www.ebay.ca': 'C $',
      'www.ebay.co.uk': '£',
      'www.ebay.com': '$',
      'www.ebay.com.au': 'AU $',
      'www.ebay.com.my': 'RM ',
      'www.ebay.com.sg': 'S$ ',
      'www.ebay.ie': 'EUR ',
      'www.ebay.ph': 'PHP '
    };
    let results = document.getElementsByClassName(
      'srp-controls__count-heading'
    )[0];
    let listings = document.getElementsByClassName('srp-results')[0];
    let items = 0;
    let sold = 0;
    let median = '0.00';
    let success = '0';
    currency = currency[window.location.hostname];
    if (!results) {
      results = document.getElementsByClassName('rcnt')[0];
    }
    if (!results) {
      results = document.getElementsByClassName('listingscnt')[0];
    }
    if (results) {
      results = Number(
        results.textContent.match(/[,0-9]+/)[0].replace(/,/g, '')
      );
    }
    if (listings) {
      listings = listings.getElementsByClassName('s-item');
    } else {
      listings = document.getElementsByClassName('sresult');
    }
    if (results && listings && listings.length) {
      let className = 'POSITIVE';
      let temp = {};
      let prices = [];
      if (document.getElementsByClassName('bidsold').length) {
        className = 'bidsold';
      }
      while (items < results && items < listings.length) {
        temp = listings[items].getElementsByClassName(className)[0];
        if (temp) {
          currency = temp.textContent.trim().match(/[^0-9]*/)[0];
          break;
        }
        items += 1;
      }
      items = 0;
      while (items < results && items < listings.length) {
        temp = listings[items].getElementsByClassName(className)[0];
        if (temp) {
          temp = temp.textContent.trim().match(/([^0-9]*)([,0-9]+\.[0-9]{2})/);
          if (currency && temp && currency === temp[1]) {
            prices[sold] = Number(temp[2].replace(/,/g, ''));
          } else {
            currency = '-';
            median = '-';
          }
          sold += 1;
        }
        items += 1;
      }
      success = Number(Number(sold * 100 / items).toFixed(1));
      if (prices.length && median !== '-') {
        prices.sort(compareNumbers);
        if (prices.length % 2 === 0) {
          median = (
            prices[prices.length / 2 - 1] + prices[prices.length / 2]
          ) / 2;
        } else {
          median = prices[(prices.length - 1) / 2];
        }
        median = median.toFixed(2).replace(/\B(?=([0-9]{3})+(?![0-9]))/g, ',');
      }
    }
    appendModule(items, sold, success, currency, median);
  }

  main();
}());
