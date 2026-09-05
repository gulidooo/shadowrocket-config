// Clash Mi All-in-One override
// Mirrors the working OpenClash All-in-One policy model while preserving the
// subscription's proxies and original rules. No proxy credentials are stored here.
//
// Assumption: the imported subscription contains the same Xeno proxy names used
// by the OpenClash profile. Missing exact node names are filtered automatically.

const REGION_GROUP_NAMES = [
  "🇯🇵 日本家宽",
  "🇺🇸 美国家宽",
  "🇹🇼 台湾家宽",
  "🇭🇰 香港家宽",
  "🇯🇵 日本节点",
  "🇺🇸 美国节点",
  "🇹🇼 台湾节点",
  "🇭🇰 香港节点",
];

const REGION_NODES = {
  "🇭🇰 香港节点": [
    "🎞️ 1.0x 🇭🇰 香港 HK - S1",
    "🎞️ 1.0x 🇭🇰 香港 HK - 0",
    "🎞️ 1.0x 🇭🇰 香港 HK - o2",
    "🎞️ 1.0x 🇭🇰 香港 HK - o3",
    "🎞️ 1.0x 🇭🇰 香港 HK - o4",
    "🎞️ 1.0x 🇭🇰 香港 HK - OC",
    "[其他不能用再用这个] HK 🎞️ 🇭🇰 香港",
    "[其他不能用再用这个] HK 🏠 🇭🇰 香港",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - S1",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - 0",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - o2",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - o3",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - o4",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - OC",
  ],
  "🇹🇼 台湾节点": [
    "🎞️ 1.0x 🇹🇼 台湾 TW - S1",
    "🎞️ 1.0x 🇹🇼 台湾 TW - 0",
    "🎞️ 1.0x 🇹🇼 台湾 TW - o2",
    "🎞️ 1.0x 🇹🇼 台湾 TW - o3",
    "🎞️ 1.0x 🇹🇼 台湾 TW - o4",
    "🎞️ 1.0x 🇹🇼 台湾 TW - OC",
    "[其他不能用再用这个] TW 🎞️ 🇹🇼 台湾",
    "[其他不能用再用这个] TW 🏠  🇹🇼 台湾 TW",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - 0",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - o2",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - o3",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - o4",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - OC",
  ],
  "🇯🇵 日本节点": [
    "🎞️ 1.0x 🇯🇵 日本 JP - 0",
    "🎞️ 1.0x 🇯🇵 日本 JP - o2",
    "🎞️ 1.0x 🇯🇵 日本 JP - o3",
    "🎞️ 1.0x 🇯🇵 日本 JP - o4",
    "🎞️ 1.0x 🇯🇵 日本 JP - OC",
    "[其他不能用再用这个] JP 🎞️ 1.0x 🇯🇵 日本",
    "[其他不能用再用这个] JP 🏠 2.0x 🇯🇵 日本",
    "🛰 [星链] 2.0x 🇯🇵 日本 JP - 0",
    "🛰 [星链] 2.0x 🇯🇵 日本 JP - o2",
    "🛰 [星链] 2.0x 🇯🇵 日本 JP - o3",
    "🛰 [星链] 2.0x 🇯🇵 日本 JP - o4",
    "🛰 [星链] 2.0x 🇯🇵 日本 JP - OC",
    "[其他不能用再用这个] JP 🛰 2.0x 🇯🇵 日本",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - 0",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - o2",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - o3",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - o4",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - OC",
  ],
  "🇺🇸 美国节点": [
    "🎞️ 1.0x 🇺🇸 美国 US - 0",
    "🎞️ 1.0x 🇺🇸 美国 US - o2",
    "🎞️ 1.0x 🇺🇸 美国 US - o3",
    "🎞️ 1.0x 🇺🇸 美国 US - o4",
    "🎞️ 1.0x 🇺🇸 美国 US - OC",
    "[其他不能用再用这个] US 🎞️ 1.0x 🇺🇸 美国",
    "[其他不能用再用这个] US 🏠 1.0x 🇺🇸 美国",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - 0",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - o2",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - o3",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - o4",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - OC",
  ],
  "🇭🇰 香港家宽": [
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - S1",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - 0",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - o2",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - o3",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - o4",
    "🏠 [家宽] 1.0x 🇭🇰 香港 HK - OC",
  ],
  "🇹🇼 台湾家宽": [
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - 0",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - o2",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - o3",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - o4",
    "🏠 [家宽] 1.0x 🇹🇼 台湾 TW - OC",
  ],
  "🇯🇵 日本家宽": [
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - 0",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - o2",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - o3",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - o4",
    "🏠 [家宽] 2.0x 🇯🇵 日本 JP - OC",
  ],
  "🇺🇸 美国家宽": [
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - 0",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - o2",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - o3",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - o4",
    "[不保Tiktok] 🏠 [家宽] 1.0x 🇺🇸 美国 US - OC",
  ],
};

const CUSTOM_POLICY_NAMES = new Set([
  "✨ Gemini",
  "📺 YouTube",
  "🪙 OKX",
  "🎯 Polymarket US",
  "📈 香港券商",
  "🏦 汇丰香港",
  "🏦 香港银行",
]);

const SPECIAL_REBUILT_NAMES = new Set([
  ...REGION_GROUP_NAMES,
  ...CUSTOM_POLICY_NAMES,
  "♻️ 自动选择",
  "🎯 直接连接",
  "🛑 阻挡连接",
]);

const PREPEND_RULES = [
  "DOMAIN-SUFFIX,chatgpt.com,🤖 ChatGPT",
  "DOMAIN-SUFFIX,openai.com,🤖 ChatGPT",
  "DOMAIN-SUFFIX,oaistatic.com,🤖 ChatGPT",
  "DOMAIN-SUFFIX,oaiusercontent.com,🤖 ChatGPT",
  "DOMAIN-SUFFIX,chat.sentry.io,🤖 ChatGPT",

  "DOMAIN-SUFFIX,claude.ai,🤖 Claude.Ai",
  "DOMAIN-SUFFIX,anthropic.com,🤖 Claude.Ai",
  "DOMAIN,servd-anthropic-website.b-cdn.net,🤖 Claude.Ai",

  "DOMAIN-SUFFIX,gemini.google.com,✨ Gemini",
  "DOMAIN-SUFFIX,bard.google.com,✨ Gemini",
  "DOMAIN,optimizationguide-pa.googleapis.com,✨ Gemini",
  "DOMAIN,robinfrontend-pa.googleapis.com,✨ Gemini",
  "DOMAIN,webchannel-robinfrontend-pa.googleapis.com,✨ Gemini",
  "DOMAIN,generativelanguage.googleapis.com,✨ Gemini",
  "DOMAIN-SUFFIX,ai.google.dev,✨ Gemini",

  "DOMAIN-SUFFIX,youtube.com,📺 YouTube",
  "DOMAIN-SUFFIX,youtu.be,📺 YouTube",
  "DOMAIN-SUFFIX,ytimg.com,📺 YouTube",
  "DOMAIN-SUFFIX,googlevideo.com,📺 YouTube",
  "DOMAIN-SUFFIX,youtube-nocookie.com,📺 YouTube",
  "DOMAIN,youtubei.googleapis.com,📺 YouTube",
  "DOMAIN,translate.googleapis.com,📺 YouTube",
  "DOMAIN,translate-pa.googleapis.com,📺 YouTube",

  "DOMAIN-SUFFIX,okx.com,🪙 OKX",
  "DOMAIN-SUFFIX,okex.com,🪙 OKX",
  "DOMAIN-SUFFIX,oklink.com,🪙 OKX",
  "DOMAIN-SUFFIX,polymarket.us,🎯 Polymarket US",

  "DOMAIN-SUFFIX,x.com,🐦 推特",
  "DOMAIN-SUFFIX,periscope.tv,🐦 推特",
  "DOMAIN-SUFFIX,pscp.tv,🐦 推特",
  "DOMAIN-SUFFIX,t.co,🐦 推特",
  "DOMAIN-SUFFIX,tellapart.com,🐦 推特",
  "DOMAIN-SUFFIX,tweetdeck.com,🐦 推特",
  "DOMAIN-SUFFIX,twimg.com,🐦 推特",
  "DOMAIN-SUFFIX,twimg.co,🐦 推特",
  "DOMAIN-SUFFIX,twitpic.com,🐦 推特",
  "DOMAIN-SUFFIX,twitter.com,🐦 推特",
  "DOMAIN-SUFFIX,twitter.jp,🐦 推特",
  "DOMAIN-SUFFIX,twitterinc.com,🐦 推特",
  "DOMAIN-SUFFIX,twitteroauth.com,🐦 推特",
  "DOMAIN-SUFFIX,twitterstat.us,🐦 推特",
  "DOMAIN-SUFFIX,twtrdns.net,🐦 推特",
  "DOMAIN-SUFFIX,twttr.com,🐦 推特",
  "DOMAIN-SUFFIX,vine.co,🐦 推特",

  "DOMAIN-SUFFIX,hsbc.com.hk,🏦 汇丰香港",
  "DOMAIN,mobile.eum-appdynamics.com,🏦 汇丰香港",

  "DOMAIN,api.sc.com,🏦 香港银行",
  "DOMAIN-SUFFIX,standardchartered.com.hk,🏦 香港银行",
  "DOMAIN-KEYWORD,standardchartered-hk,🏦 香港银行",
  "DOMAIN-SUFFIX,ccb.com.hk,🏦 香港银行",
  "DOMAIN,asia.ccb.com,🏦 香港银行",
  "DOMAIN-SUFFIX,bochk.com,🏦 香港银行",
  "DOMAIN-SUFFIX,bankofchina.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,bocpay.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,hkbea.com,🏦 香港银行",
  "DOMAIN-SUFFIX,dbs.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,cncbinternational.com,🏦 香港银行",
  "DOMAIN-SUFFIX,cmbwinglungbank.com,🏦 香港银行",
  "DOMAIN-SUFFIX,winglungbank.com,🏦 香港银行",
  "DOMAIN-SUFFIX,hangseng.com,🏦 香港银行",
  "DOMAIN-SUFFIX,shacombank.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,publicbank.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,ocbc.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,ocbcwhhk.com,🏦 香港银行",
  "DOMAIN-SUFFIX,tybhk.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,chiyubank.com,🏦 香港银行",
  "DOMAIN-SUFFIX,dahsing.com,🏦 香港银行",
  "DOMAIN-SUFFIX,dahsing.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,chbank.com,🏦 香港银行",
  "DOMAIN-SUFFIX,ncb.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,icbcasia.com,🏦 香港银行",
  "DOMAIN-SUFFIX,fubonbank.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,fubon.com,🏦 香港银行",
  "DOMAIN-SUFFIX,citi.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,bankcomm.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,bodintl.com,🏦 香港银行",
  "DOMAIN-SUFFIX,za.group,🏦 香港银行",
  "DOMAIN-SUFFIX,livibank.com,🏦 香港银行",
  "DOMAIN-SUFFIX,mox.com,🏦 香港银行",
  "DOMAIN-SUFFIX,welab.bank,🏦 香港银行",
  "DOMAIN-SUFFIX,fusionbank.com,🏦 香港银行",
  "DOMAIN-SUFFIX,paob.com.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,antbank.hk,🏦 香港银行",
  "DOMAIN-SUFFIX,airstarbank.com,🏦 香港银行",

  "DOMAIN-SUFFIX,itiger.com,📈 香港券商",
  "DOMAIN-SUFFIX,tigerbrokers.com.hk,📈 香港券商",
  "DOMAIN-SUFFIX,longbridge.com,📈 香港券商",
  "DOMAIN-SUFFIX,longbridge.hk,📈 香港券商",
  "DOMAIN-SUFFIX,longbridge.global,📈 香港券商",
  "DOMAIN-SUFFIX,futuhk.com,📈 香港券商",
  "DOMAIN-SUFFIX,futu5.com,📈 香港券商",
  "DOMAIN-SUFFIX,futunn.com,📈 香港券商",
  "DOMAIN-SUFFIX,usmart.hk,📈 香港券商",
  "DOMAIN-SUFFIX,usmartsecurities.com,📈 香港券商",
  "DOMAIN-SUFFIX,fosunwealth.com,📈 香港券商",
  "DOMAIN-SUFFIX,chiefgroup.com.hk,📈 香港券商",

  // Domestic CDN / common China direct optimization.
  "DOMAIN-SUFFIX,jd.com,DIRECT",
  "DOMAIN-SUFFIX,jdimg.com,DIRECT",
  "DOMAIN-SUFFIX,360buyimg.com,DIRECT",
  "DOMAIN-SUFFIX,jdcdn.com,DIRECT",
  "DOMAIN-SUFFIX,taobao.com,DIRECT",
  "DOMAIN-SUFFIX,alicdn.com,DIRECT",
  "DOMAIN-SUFFIX,alipay.com,DIRECT",
  "DOMAIN-SUFFIX,tmall.com,DIRECT",
  "DOMAIN-SUFFIX,qq.com,DIRECT",
  "DOMAIN-SUFFIX,qpic.cn,DIRECT",
  "DOMAIN-SUFFIX,weixin.qq.com,DIRECT",
  "DOMAIN-SUFFIX,gtimg.com,DIRECT",
  "DOMAIN-SUFFIX,bdstatic.com,DIRECT",
  "DOMAIN-SUFFIX,baidu.com,DIRECT",
  "GEOIP,CN,DIRECT,no-resolve",
];

function uniq(items) {
  const out = [];
  const seen = new Set();
  for (const item of items || []) {
    if (item == null || seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

function makeRegionGroup(name, nodeNames, availableProxyNames) {
  const available = nodeNames.filter((name) => availableProxyNames.has(name));
  return {
    name,
    type: "url-test",
    proxies: available.length > 0 ? available : ["REJECT"],
    url: "https://www.gstatic.com/generate_204",
    interval: 60,
    tolerance: 100,
    lazy: false,
  };
}

function patchOriginalSelectGroup(group) {
  if (!group || group.type !== "select") return group;
  if (group.name === "🎯 直接连接" || group.name === "🛑 阻挡连接") return group;

  group.proxies = uniq([
    ...REGION_GROUP_NAMES,
    ...(Array.isArray(group.proxies) ? group.proxies : []),
  ]);

  if (group.name === "🔰 节点选择") {
    group["include-all"] = true;
  }

  return group;
}

function main(config) {
  config = config || {};

  const proxies = Array.isArray(config.proxies) ? config.proxies : [];
  const availableProxyNames = new Set(
    proxies.map((proxy) => proxy && proxy.name).filter(Boolean)
  );

  const regionGroups = [
    makeRegionGroup("🇭🇰 香港节点", REGION_NODES["🇭🇰 香港节点"], availableProxyNames),
    makeRegionGroup("🇹🇼 台湾节点", REGION_NODES["🇹🇼 台湾节点"], availableProxyNames),
    makeRegionGroup("🇯🇵 日本节点", REGION_NODES["🇯🇵 日本节点"], availableProxyNames),
    makeRegionGroup("🇺🇸 美国节点", REGION_NODES["🇺🇸 美国节点"], availableProxyNames),
    makeRegionGroup("🇭🇰 香港家宽", REGION_NODES["🇭🇰 香港家宽"], availableProxyNames),
    makeRegionGroup("🇹🇼 台湾家宽", REGION_NODES["🇹🇼 台湾家宽"], availableProxyNames),
    makeRegionGroup("🇯🇵 日本家宽", REGION_NODES["🇯🇵 日本家宽"], availableProxyNames),
    makeRegionGroup("🇺🇸 美国家宽", REGION_NODES["🇺🇸 美国家宽"], availableProxyNames),
  ];

  const customPolicies = [
    {
      name: "✨ Gemini",
      type: "select",
      proxies: [...REGION_GROUP_NAMES, "🔰 节点选择", "DIRECT", "REJECT"],
    },
    {
      name: "📺 YouTube",
      type: "select",
      proxies: [...REGION_GROUP_NAMES, "🔰 节点选择", "DIRECT", "REJECT"],
    },
    {
      name: "🪙 OKX",
      type: "select",
      proxies: [
        "🇭🇰 香港家宽",
        "🇯🇵 日本家宽",
        "🇺🇸 美国家宽",
        "🇹🇼 台湾家宽",
        "🇭🇰 香港节点",
        "🇯🇵 日本节点",
        "🇺🇸 美国节点",
        "🇹🇼 台湾节点",
        "🔰 节点选择",
        "DIRECT",
        "REJECT",
      ],
    },
    {
      name: "🎯 Polymarket US",
      type: "select",
      proxies: ["🇺🇸 美国家宽", "🇺🇸 美国节点", "REJECT"],
    },
    {
      name: "📈 香港券商",
      type: "select",
      proxies: ["🇭🇰 香港家宽", "🇭🇰 香港节点", "🔰 节点选择", "DIRECT", "REJECT"],
    },
    {
      name: "🏦 汇丰香港",
      type: "select",
      proxies: ["🇭🇰 香港节点", "🇭🇰 香港家宽", "DIRECT", "🔰 节点选择", "REJECT"],
    },
    {
      name: "🏦 香港银行",
      type: "select",
      proxies: ["DIRECT", "🇭🇰 香港节点", "🇭🇰 香港家宽", "🔰 节点选择", "REJECT"],
    },
  ];

  const originalGroups = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"]
    : [];

  const patchedOriginalGroups = originalGroups
    .filter((group) => group && !SPECIAL_REBUILT_NAMES.has(group.name))
    .map((group) => patchOriginalSelectGroup({ ...group }));

  const autoGroup = {
    name: "♻️ 自动选择",
    type: "url-test",
    "include-all": true,
    filter: "^((?!(剩余流量|距离下次|套餐到期|Telegram|公告|官网|更新订阅|无法更新|重新前往)).)*$",
    url: "https://www.gstatic.com/generate_204",
    interval: 600,
    tolerance: 100,
    lazy: false,
  };

  const directGroup = {
    name: "🎯 直接连接",
    type: "select",
    proxies: ["DIRECT"],
  };

  const rejectGroup = {
    name: "🛑 阻挡连接",
    type: "select",
    proxies: ["REJECT"],
  };

  config["proxy-groups"] = [
    ...regionGroups,
    ...customPolicies,
    ...patchedOriginalGroups,
    autoGroup,
    directGroup,
    rejectGroup,
  ];

  const oldRules = Array.isArray(config.rules) ? config.rules : [];
  const prependSet = new Set(PREPEND_RULES);
  config.rules = PREPEND_RULES.concat(oldRules.filter((rule) => !prependSet.has(rule)));

  return config;
}
