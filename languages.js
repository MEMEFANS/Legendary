// 多语言支持
const translations = {
    'zh': {
        // 导航栏
        'connect_wallet': '连接钱包',
        'connected': '已连接',
        'wallet_not_installed': '请安装 TronLink 钱包',
        
        // 标题和介绍
        'site_title': 'Legendary token数字资产UUUU',
        'intro_title': 'Legendary token数字资产 UUUU',
        'intro_text': 'Legendary token数字资产UUUU是基于TRON网络开发的创新数字资产，致力于构建一个更加开放、透明和高效的去中心化金融生态系统。我们利用区块链技术的优势，为用户提供安全可靠的数字资产服务。',
        
        // 特点
        'feature_secure': '安全可靠',
        'feature_secure_desc': '基于TRON网络的智能合约技术，确保资产安全和交易透明度，采用多重安全机制，保障用户资产安全。',
        'feature_performance': '高性能',
        'feature_performance_desc': '依托TRON网络的高性能基础设施，支持快速交易确认和低成本转账，为用户提供流畅的使用体验。',
        'feature_community': '社区驱动',
        'feature_community_desc': '采用去中心化治理机制，社区成员可参与项目决策和发展方向，共同建设TRU生态系统。',
        
        // 代币经济
        'token_economics': '代币经济',
        'total_supply': '总供应量',
        'benefit_1': '参与社区治理投票',
        'benefit_2': '享受生态系统收益',
        'benefit_3': '优先参与新项目',
        'benefit_4': '专属社区活动',
        
        // 实时数据
        'live_stats': '实时数据',
        'circulating_supply': '当前流通量',
        'daily_volume': '24小时交易量',
        'holders_count': '持币地址数量',
        
        // 代币兑换
        'token_exchange': '代币兑换',
        'install_alert': '请确保安装并解锁 TronLink 钱包',
        'exchange_button': '兑换',
        'processing': '处理中...',
        
        // 合作伙伴
        'partners': '战略合作伙伴',
        'partner_gov': 'Legendary token官方',
        'partner_gov_desc': '官方授权的数字资产项目，获得全面支持和认可',
        'partner_tron': 'TRON',
        'partner_tron_desc': '基于TRON网络开发，享受高性能、低成本的区块链基础设施',
        'partner_bank': 'Legendary 金融',
        'partner_bank_desc': '确保合规运营和金融创新',
        
        // 项目优势
        'advantages': '项目优势',
        'adv_gov': '政府背书',
        'adv_gov_1': 'Legendary token官方认可',
        'adv_gov_2': '合法合规运营保障',
        'adv_gov_3': '政策支持优势',
        'adv_asset': '资产优势',
        'adv_asset_1': '稀缺性：总量限制2199.9999万枚',
        'adv_asset_2': '高流动性：多平台支持',
        'adv_asset_3': '价值稳定：政府信用背书',
        'adv_use': '应用场景',
        'adv_use_1': '数字支付结算',
        'adv_use_2': '跨境贸易融资',
        'adv_use_3': '数字资产投资',
        'adv_use_4': '生态系统治理',
        
        // 交易信息
        'success_title': '兑换成功',
        'success_msg': '您的TRX已成功兑换为UUUU代币',
        'error_title': '兑换失败',
        'insufficent_balance': '余额不足',
        'minimum_amount': '最低兑换金额为20 TRX'
    },
    'en': {
        // Navigation
        'connect_wallet': 'Connect Wallet',
        'connected': 'Connected',
        'wallet_not_installed': 'Please install TronLink wallet',
        
        // Title and Introduction
        'site_title': 'Legendary token Digital Asset UUUU',
        'intro_title': 'Legendary token Digital Asset UUUU',
        'intro_text': 'Legendary token Digital Asset UUUU is an innovative digital asset developed on the TRON network, dedicated to building a more open, transparent, and efficient decentralized financial ecosystem. We leverage the advantages of blockchain technology to provide users with secure and reliable digital asset services.',
        
        // Features
        'feature_secure': 'Secure & Reliable',
        'feature_secure_desc': 'Based on TRON network\'s smart contract technology, ensuring asset security and transaction transparency with multiple security mechanisms to protect user assets.',
        'feature_performance': 'High Performance',
        'feature_performance_desc': 'Relying on TRON network\'s high-performance infrastructure, supporting fast transaction confirmation and low-cost transfers, providing users with a smooth experience.',
        'feature_community': 'Community Driven',
        'feature_community_desc': 'Adopting a decentralized governance mechanism, community members can participate in project decisions and development direction, jointly building the TRU ecosystem.',
        
        // Token Economics
        'token_economics': 'Token Economics',
        'total_supply': 'Total Supply',
        'benefit_1': 'Participate in community governance voting',
        'benefit_2': 'Enjoy ecosystem benefits',
        'benefit_3': 'Priority access to new projects',
        'benefit_4': 'Exclusive community events',
        
        // Live Stats
        'live_stats': 'Live Statistics',
        'circulating_supply': 'Circulating Supply',
        'daily_volume': '24h Trading Volume',
        'holders_count': 'Number of Holders',
        
        // Token Exchange
        'token_exchange': 'Token Exchange',
        'install_alert': 'Please make sure TronLink wallet is installed and unlocked',
        'exchange_button': 'Exchange',
        'processing': 'Processing...',
        
        // Partners
        'partners': 'Strategic Partners',
        'partner_gov': 'Legendary token Official',
        'partner_gov_desc': 'Officially authorized digital asset project with full support and approval',
        'partner_tron': 'TRON',
        'partner_tron_desc': 'Developed on the TRON network, enjoying high-performance, low-cost blockchain infrastructure',
        'partner_bank': 'Legendary Finance',
        'partner_bank_desc': 'Ensuring compliant operations and financial innovation',
        
        // Advantages
        'advantages': 'Project Advantages',
        'adv_gov': 'Government Endorsement',
        'adv_gov_1': 'Official recognition by Legendary token',
        'adv_gov_2': 'Legal and compliant operational guarantee',
        'adv_gov_3': 'Policy support advantages',
        'adv_asset': 'Asset Advantages',
        'adv_asset_1': 'Scarcity: Total supply limited to 21,999,999 tokens',
        'adv_asset_2': 'High liquidity: Multi-platform support',
        'adv_asset_3': 'Stable value: Government credit endorsement',
        'adv_use': 'Use Cases',
        'adv_use_1': 'Digital payment settlement',
        'adv_use_2': 'Cross-border trade financing',
        'adv_use_3': 'Digital asset investment',
        'adv_use_4': 'Ecosystem governance',
        
        // Transaction Information
        'success_title': 'Exchange Successful',
        'success_msg': 'Your TRX has been successfully exchanged for UUUU tokens',
        'error_title': 'Exchange Failed',
        'insufficent_balance': 'Insufficient balance',
        'minimum_amount': 'Minimum exchange amount is 20 TRX'
    }
};
