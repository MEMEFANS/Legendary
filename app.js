let tronWeb;
let contract;
const CONTRACT_ADDRESS = 'TDh764XBtebnEjADfcP6sW8mRWU4Xa7ymE';
const EXCHANGE_RATE = 20; // 兑换比例: 20 TRX = 1 UUUU

// 当前语言
let currentLang = localStorage.getItem('preferred_language') || 'en';

// 切换语言函数
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred_language', lang);
    applyTranslations();
    
    // 更新当前语言显示
    document.getElementById('current-lang').textContent = lang === 'zh' ? '中文' : 'English';
    
    // 关闭下拉菜单
    document.getElementById('langDropdown').classList.add('d-none');
}

// 应用翻译内容
function applyTranslations() {
    // 获取当前语言的翻译数据
    const langData = translations[currentLang];
    if (!langData) return;
    
    // 设置页面标题
    document.title = langData.site_title;
    
    // 更新导航栏
    const connectBtn = document.getElementById('connectWallet');
    if (connectBtn) {
        if (connectBtn.classList.contains('connected')) {
            connectBtn.textContent = langData.connected;
        } else {
            connectBtn.textContent = langData.connect_wallet;
        }
    }
    
    // 更新标题和介绍
    document.querySelector('h1').textContent = langData.intro_title;
    document.querySelector('.intro-text').textContent = langData.intro_text;
    
    // 更新特点
    const features = document.querySelectorAll('.feature-card h3');
    if (features.length >= 3) {
        features[0].textContent = langData.feature_secure;
        features[1].textContent = langData.feature_performance;
        features[2].textContent = langData.feature_community;
    }
    
    const featureDesc = document.querySelectorAll('.feature-card p');
    if (featureDesc.length >= 3) {
        featureDesc[0].textContent = langData.feature_secure_desc;
        featureDesc[1].textContent = langData.feature_performance_desc;
        featureDesc[2].textContent = langData.feature_community_desc;
    }
    
    // 更新代币经济
    document.querySelector('#token-economics h2').textContent = langData.token_economics;
    document.querySelector('.token-stat-label').textContent = langData.total_supply;
    
    const benefits = document.querySelectorAll('.benefit-item');
    if (benefits.length >= 4) {
        benefits[0].textContent = langData.benefit_1;
        benefits[1].textContent = langData.benefit_2;
        benefits[2].textContent = langData.benefit_3;
        benefits[3].textContent = langData.benefit_4;
    }
    
    // 更新实时数据
    document.querySelector('#live-stats h2').textContent = langData.live_stats;
    
    const statTitles = document.querySelectorAll('.stat-title');
    if (statTitles.length >= 3) {
        statTitles[0].textContent = langData.circulating_supply;
        statTitles[1].textContent = langData.daily_volume;
        statTitles[2].textContent = langData.holders_count;
    }
    
    // 更新代币兑换
    document.querySelector('#exchange h2').textContent = langData.token_exchange;
    document.getElementById('install-alert').textContent = langData.install_alert;
    document.getElementById('exchangeButton').innerHTML = 
        `<i class="fas fa-exchange-alt"></i> ${langData.exchange_button}`;
    
    // 更新合作伙伴
    document.querySelector('#partners h2').textContent = langData.partners;
    
    const partnerTitles = document.querySelectorAll('.partner-card h3');
    if (partnerTitles.length >= 3) {
        partnerTitles[0].textContent = langData.partner_gov;
        partnerTitles[1].textContent = langData.partner_tron;
        partnerTitles[2].textContent = langData.partner_bank;
    }
    
    const partnerDesc = document.querySelectorAll('.partner-card p');
    if (partnerDesc.length >= 3) {
        partnerDesc[0].textContent = langData.partner_gov_desc;
        partnerDesc[1].textContent = langData.partner_tron_desc;
        partnerDesc[2].textContent = langData.partner_bank_desc;
    }
    
    // 更新项目优势
    document.querySelector('#advantages h2').textContent = langData.advantages;
    
    const advTitles = document.querySelectorAll('.advantage-card h3');
    if (advTitles.length >= 3) {
        // 删除图标
        const govIcon = advTitles[0].querySelector('i').outerHTML;
        const assetIcon = advTitles[1].querySelector('i').outerHTML;
        const useIcon = advTitles[2].querySelector('i').outerHTML;
        
        advTitles[0].innerHTML = `${govIcon} ${langData.adv_gov}`;
        advTitles[1].innerHTML = `${assetIcon} ${langData.adv_asset}`;
        advTitles[2].innerHTML = `${useIcon} ${langData.adv_use}`;
    }
    
    const advantageLists = document.querySelectorAll('.advantage-card ul');
    if (advantageLists.length >= 3) {
        // 政府背书
        const govItems = advantageLists[0].querySelectorAll('li');
        if (govItems.length >= 3) {
            govItems[0].textContent = langData.adv_gov_1;
            govItems[1].textContent = langData.adv_gov_2;
            govItems[2].textContent = langData.adv_gov_3;
        }
        
        // 资产优势
        const assetItems = advantageLists[1].querySelectorAll('li');
        if (assetItems.length >= 3) {
            assetItems[0].textContent = langData.adv_asset_1;
            assetItems[1].textContent = langData.adv_asset_2;
            assetItems[2].textContent = langData.adv_asset_3;
        }
        
        // 应用场景
        const useItems = advantageLists[2].querySelectorAll('li');
        if (useItems.length >= 4) {
            useItems[0].textContent = langData.adv_use_1;
            useItems[1].textContent = langData.adv_use_2;
            useItems[2].textContent = langData.adv_use_3;
            useItems[3].textContent = langData.adv_use_4;
        }
    }
}

// 检查钱包状态
async function checkWalletStatus() {
    console.log('Checking wallet status...');
    console.log('TronLink exists:', !!window.tronLink);
    console.log('TronWeb exists:', !!window.tronWeb);
    
    if (window.tronWeb && window.tronWeb.ready) {
        console.log('TronWeb is ready');
        tronWeb = window.tronWeb;
        
        if (tronWeb.defaultAddress.base58) {
            console.log('Wallet connected:', tronWeb.defaultAddress.base58);
            updateWalletUI(true);
            await updateWalletInfo();
            await initContract();
            return true;
        } else {
            console.log('No wallet address found');
        }
    } else if (window.tronLink) {
        console.log('TronLink found but not ready');
        try {
            // 尝试请求连接
            await window.tronLink.request({ method: 'tron_requestAccounts' });
            // 等待TronWeb就绪
            return await waitForTronWeb();
        } catch (error) {
            console.error('Failed to request accounts:', error);
        }
    }
    
    console.log('Wallet not connected');
    updateWalletUI(false);
    return false;
}

// 等待TronWeb就绪
function waitForTronWeb(retries = 10) {
    return new Promise((resolve) => {
        let attempts = 0;
        const checkTronWeb = async () => {
            attempts++;
            console.log(`Checking TronWeb attempt ${attempts}`);
            
            if (window.tronWeb && window.tronWeb.ready && window.tronWeb.defaultAddress.base58) {
                console.log('TronWeb is now ready');
                tronWeb = window.tronWeb;
                updateWalletUI(true);
                await updateWalletInfo();
                await initContract();
                resolve(true);
            } else if (attempts < retries) {
                setTimeout(checkTronWeb, 500);
            } else {
                console.log('TronWeb not ready after maximum attempts');
                updateWalletUI(false);
                resolve(false);
            }
        };
        checkTronWeb();
    });
}

// 更新钱包UI状态
function updateWalletUI(isConnected) {
    const connectBtn = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('wallet-info');
    const installAlert = document.getElementById('install-alert');
    const exchangeForm = document.querySelector('.exchange-form');
    
    if (isConnected) {
        connectBtn.textContent = '已连接';
        connectBtn.classList.add('connected');
        walletInfo?.classList.remove('d-none');
        installAlert?.classList.add('d-none');
        exchangeForm?.classList.remove('d-none');
    } else {
        connectBtn.textContent = '连接钱包';
        connectBtn.classList.remove('connected');
        walletInfo?.classList.add('d-none');
        installAlert?.classList.remove('d-none');
        exchangeForm?.classList.add('d-none');
    }
}

// 连接钱包
async function connectWallet() {
    console.log('Connecting wallet...');
    if (!window.tronLink) {
        alert('请安装 TronLink 钱包');
        return;
    }
    
    try {
        await window.tronLink.request({ method: 'tron_requestAccounts' });
        return await waitForTronWeb();
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        return false;
    }
}

// 更新钱包信息
async function updateWalletInfo() {
    if (!window.tronWeb || !window.tronWeb.ready) return;

    const walletAddress = window.tronWeb.defaultAddress.base58;
    if (!walletAddress) return;

    try {
        // 获取TRX余额
        const balance = await window.tronWeb.trx.getBalance(walletAddress);
        const trxBalance = window.tronWeb.fromSun(balance);

        // 更新显示
        document.querySelector('.wallet-address').textContent = 
            `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
    } catch (error) {
        console.error('Failed to update wallet info:', error);
    }
}

// 初始化合约
async function initContract() {
    try {
        if (!window.tronWeb) {
            throw new Error('TronWeb not found');
        }

        // Exchange合约ABI
        const exchangeABI = [
            {
                "inputs": [
                    {
                        "name": "_truToken",
                        "type": "address"
                    },
                    {
                        "name": "_trxReceiver",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "exchangeTRXForTRU",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ];

        contract = await window.tronWeb.contract(exchangeABI, CONTRACT_ADDRESS);
        console.log('Contract initialized:', contract);
        return true;
    } catch (error) {
        console.error('Failed to initialize contract:', error);
        return false;
    }
}

// 计算兑换数量
function calculateExchange() {
    const trxInput = document.getElementById('trxAmount');
    const truOutput = document.getElementById('truAmount');
    
    const trxAmount = parseFloat(trxInput.value) || 0;
    const truAmount = trxAmount / EXCHANGE_RATE; // 20 TRX = 1 TRU
    
    truOutput.value = truAmount.toFixed(8);
}

// 检查余额
async function checkBalance(amount) {
    if (!window.tronWeb || !window.tronWeb.ready) return false;

    try {
        const balance = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58);
        const trxBalance = window.tronWeb.fromSun(balance);
        return parseFloat(trxBalance) >= parseFloat(amount);
    } catch (error) {
        console.error('Failed to check balance:', error);
        return false;
    }
}

// 执行兑换
async function performExchange() {
    const exchangeButton = document.getElementById('exchangeButton');
    const originalText = exchangeButton.innerHTML;
    
    try {
        exchangeButton.disabled = true;
        exchangeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
        
        if (!window.tronWeb || !window.tronWeb.ready) {
            throw new Error('请先连接钱包');
        }

        const userAddress = window.tronWeb.defaultAddress.base58;
        if (!userAddress) {
            throw new Error('未检测到钱包地址');
        }

        const trxAmount = document.getElementById('trxAmount').value;
        if (!trxAmount || trxAmount <= 0) {
            throw new Error('请输入有效的TRX数量');
        }

        if (trxAmount < 20) {
            throw new Error('最少需要20 TRX');
        }

        // 检查余额
        const hasEnoughBalance = await checkBalance(trxAmount);
        if (!hasEnoughBalance) {
            throw new Error('TRX余额不足');
        }

        try {
            console.log('Starting exchange process...');
            console.log('User address:', userAddress);
            console.log('TRX amount:', trxAmount);
            
            // 调用Exchange合约的exchangeTRXForTRU函数
            const transaction = await contract.exchangeTRXForTRU().send({
                callValue: window.tronWeb.toSun(trxAmount),
                shouldPollResponse: false  // 改为 false，不等待交易确认
            });

            console.log('Exchange transaction sent:', transaction);
            
            // 清空输入框
            document.getElementById('trxAmount').value = '';
            document.getElementById('truAmount').value = '';
            
            // 显示成功消息
            await Swal.fire({
                title: '兑换成功！',
                text: '请在钱包中查看代币',
                icon: 'success',
                confirmButtonText: '确定'
            });
            
            // 更新钱包信息
            await updateWalletInfo();
            
        } catch (error) {
            console.error('Exchange error:', error);
            throw new Error(error.message || '兑换过程中发生错误');
        }
    } catch (error) {
        console.error('Exchange error:', error);
        showError(error.message || '兑换失败，请重试');
    } finally {
        exchangeButton.disabled = false;
        exchangeButton.innerHTML = originalText;
    }
}

// 显示成功消息
function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: translations[currentLang].success_title,
        text: message,
        confirmButtonColor: '#3498db',
        timer: 5000,
        timerProgressBar: true
    });
}

// 显示错误消息
function showError(message) {
    Swal.fire({
        icon: 'error',
        title: translations[currentLang].error_title,
        text: message,
        confirmButtonColor: '#3498db'
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 连接钱包按钮事件
    document.getElementById('connectWallet')?.addEventListener('click', connectWallet);
    
    // 添加兑换相关事件监听
    document.getElementById('trxAmount')?.addEventListener('input', calculateExchange);
    document.getElementById('exchangeButton')?.addEventListener('click', performExchange);
    
    // 添加语言切换按钮事件
    document.getElementById('langToggle')?.addEventListener('click', function() {
        const dropdown = document.getElementById('langDropdown');
        dropdown.classList.toggle('d-none');
    });
    
    // 添加语言选项事件
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // 点击其他区域关闭语言下拉菜单
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('langDropdown');
        const langToggle = document.getElementById('langToggle');
        
        if (!dropdown.contains(event.target) && !langToggle.contains(event.target)) {
            dropdown.classList.add('d-none');
        }
    });
    
    // 初始化应用语言
    applyTranslations();
    
    // 设置当前语言显示
    document.getElementById('current-lang').textContent = currentLang === 'zh' ? '中文' : 'English';
    
    // 尝试检查钱包状态
    await checkWalletStatus();
});
