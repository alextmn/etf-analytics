
export const Setting: Record<string, any> = {
    etf : {
      url: 'assets/etf_list.json',
      name: 'ETF',
      t: [
        { title: 'SPY', ticker:'SPY', subTitle:'S&P 500 Index', icon:'S'},
        { title: 'GLD', ticker:'GLD', subTitle:'Gold', icon:'G'},
        { title: 'IEF', ticker:'IEF', subTitle:'7-10 Year US Treasury', icon:'I'},
      ],
    },
    crypto : {
      url: 'assets/crypto_list.json',
      name: 'Crypto',
      t: [
        { title: 'BTC', ticker:'BTC-USD', subTitle:'Bitcoin', icon:'sbi-btc'},
        { title: 'ETH', ticker:'ETH-USD', subTitle:'Etherium', icon:'sbi-eth'},
        { title: 'BCH', ticker:'BCH-USD', subTitle:'Bitcon Cash', icon:'sbi-bch'},
      ],
    },

    forex : {
      url: 'assets/forex_list.json',
      name: 'Forex',
       t: [
        { title: 'EURUSD', ticker:'EURUSD=X', subTitle:'Euro / USD', icon:'E'},
        { title: 'GBPUSD', ticker:'GBPUSD=X', subTitle:'GPB / USD', icon:'G'},
        { title: 'JPY', ticker:'JPY=X', subTitle:'JPY / USD', icon:'J'},
      ],
    },
    sector : {
      url: 'assets/sector_list.json',
      name: 'Sector',
       t: [
        { title: 'XLC', ticker:'XLC', subTitle:'Communications', icon:'C'},
        { title: 'XLRE', ticker:'XLRE', subTitle:'Real Estate', icon:'R'},
        { title: 'XLF', ticker:'XLF', subTitle:'Finance', icon:'J'},
      ],
    },
    world : {
      url: 'assets/world_list.json',
      name: 'World',
       t: [
        { title: 'EWH', ticker:'EWH', subTitle:'MSCI Hong Kong', icon:'E'},
        { title: 'INDA', ticker:'INDA', subTitle:'MSCI India ETF', icon:'I'},
        { title: 'CHIX', ticker:'CHIX', subTitle:'MSCI China ETF', icon:'J'},
      ],
    }
  };
  // ETF list https://www.interactivebrokers.com/en/?f=%2Fen%2Ftrading%2Fetfs.php%3Fexch%3Dcboe
  export function TickerResolver(a: string):string {
    const m : Record<string, string> = {
      'BTC-USD':'Bitcoin',
      'BCH-USD':'Btcoin Cash',
      'ETH-USD':'Etherium',
      'EOS-USD':'EOS',
      
      'SPY':'SPDR S&P 500 ETF Trust',
      'TIP':'iShares TIPS Bond ETF',
      'LQD':'iShares iBoxx $ Investment Grade Corporate Bond ETF',
      'HYG':'iShares iBoxx High Yield Corporate Bond ETF',
      'EMB':'iShares JP Morgan USD Emerging Markets Bond ETF',
      'EEM':'	iShares MSCI Emerging Markets ETF',
      'BNDX':'Vanguard Total International Bond ETF',
      'VXUS':'Vanguard Total International Stock ETF',
      'VNQ':'Vanguard Real Estate ETF',
      'PFF':'iShares Preferred & Income Securities ETF',
      'CWB':'	SPDR Bloomberg Barclays Convertible Securities ETF',
      'GLD':'SPDR Gold Shares',
      'DBC':'Invesco DB Commodity Index Tracking Fund',
      "IEF": "7-10 Year US Treasury",

      'EWG':'iShares MSCI Germany ETF',
      'EWH':'iShares MSCI Hong Kong ETF', 
      'EWC':'iShares MSCI Canada ETF',
      'EWA':'iShares MSCI Australia ETF',
      'EWZ':'iShares MSCI Brazil ETF',
      'ERUS':'iShares MSCI Russia ETF',
      'INDA':'iShares MSCI India ETF',
      'CHIX':'Global X MSCI China Financials ETF',
      'EWJ':'iShares MSCI Japan ETF',

      'XLC':'Communication Services Select Sector SPDR Fund',
      'XLI':'Industrial Select Sector SPDR Fund',
      'XLY':'Consumer Discretionary Select Sector SPDR Fund',
      'XLP':'Consumer Staples Select Sector SPDR Fund',
      'XLB':'Materials Select Sector SPDR Fund',
      'XLK':'Technology Select Sector SPDR Fund',
      'XLU':'Utilities Select Sector SPDR Fund',
      'XLRE':'Real Estate Select Sector SPDR Fund',
      'XLF':'Financial Select Sector SPDR Fund',
      'XLV':'Health Care Select Sector SPDR Fund',

    };
    return m[a] ?? a;
  };