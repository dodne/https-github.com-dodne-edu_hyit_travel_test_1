/* ==========================================================================
   HYUNDAI IT SINGLE PAGE - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
     * 1. HEADER SCROLL & NAVIGATION
     * -------------------------------------------------------------------------- */
    const header = document.getElementById('main-header');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link scroll spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    /* --------------------------------------------------------------------------
     * 2. THEME TOGGLE (DARK / LIGHT)
     * -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggleBtn.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fa-solid fa-sun';
            showToast('라이트 테마로 변경되었습니다.');
        } else {
            icon.className = 'fa-solid fa-moon';
            showToast('다크 테마로 변경되었습니다.');
        }
    });

    /* --------------------------------------------------------------------------
     * 3. MOBILE NAVIGATION DRAWER
     * -------------------------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNavOverlay.classList.add('open');
    });

    mobileNavClose.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('open');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
        });
    });

    /* --------------------------------------------------------------------------
     * 4. WHITEBOARD CANVAS SIMULATOR ENGINE
     * -------------------------------------------------------------------------- */
    const canvas = document.getElementById('whiteboardCanvas');
    const ctx = canvas.getContext('2d');
    const canvasContainer = document.getElementById('canvasContainer');

    let isDrawing = false;
    let currentTool = 'pen'; // 'pen', 'highlighter', 'eraser', 'shape'
    let strokeColor = '#00D2FF';
    let strokeWidth = 4;
    let startX = 0;
    let startY = 0;

    // Resize canvas resolution
    function resizeCanvas() {
        const rect = canvasContainer.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawInitialDemoContent();
    }

    // Initial demo drawings on canvas
    function drawInitialDemoContent() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw sample diagram text
        ctx.save();
        ctx.strokeStyle = '#00D2FF';
        ctx.fillStyle = '#00D2FF';
        ctx.lineWidth = 3;
        ctx.font = 'bold 22px "Noto Sans KR"';
        
        ctx.fillText('HYUNDAI IT Smartboard 3.0 Live Pen Demo', 40, 50);

        // Draw sample shape & circle
        ctx.beginPath();
        ctx.arc(150, 160, 50, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '14px "Noto Sans KR"';
        ctx.fillText('손쉽고 빠른 10ms 터치 판서', 220, 160);

        ctx.strokeStyle = '#FF3366';
        ctx.strokeRect(40, 240, 320, 100);
        ctx.fillStyle = '#FF3366';
        ctx.fillText('✓ 구글 EDLA 공식 인증 호환성', 60, 280);
        ctx.fillText('✓ 13MP AI 자동 추적 카메라', 60, 310);

        ctx.restore();
    }

    // Canvas Events
    function getCanvasCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const coords = getCanvasCoordinates(e);
        startX = coords.x;
        startY = coords.y;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const coords = getCanvasCoordinates(e);

        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (currentTool === 'pen') {
            ctx.strokeStyle = strokeColor;
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
        } else if (currentTool === 'highlighter') {
            ctx.strokeStyle = strokeColor + '55'; // add alpha
            ctx.lineWidth = strokeWidth * 3;
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
        } else if (currentTool === 'eraser') {
            ctx.clearRect(coords.x - strokeWidth * 2, coords.y - strokeWidth * 2, strokeWidth * 4, strokeWidth * 4);
        }
    }

    function stopDrawing(e) {
        if (!isDrawing) return;
        if (currentTool === 'shape') {
            const coords = getCanvasCoordinates(e);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.strokeRect(startX, startY, coords.x - startX, coords.y - startY);
        }
        isDrawing = false;
        ctx.beginPath();
    }

    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    // Canvas Toolbar Controllers
    const toolBtns = document.querySelectorAll('.tool-btn:not(.ai-btn):not(.danger):not(.success)');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.id === 'toolPen') currentTool = 'pen';
            if (btn.id === 'toolHighlighter') currentTool = 'highlighter';
            if (btn.id === 'toolEraser') currentTool = 'eraser';
            if (btn.id === 'toolShape') currentTool = 'shape';
        });
    });

    // Color Palette listener
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            strokeColor = dot.getAttribute('data-color');
        });
    });

    // Pen Width slider
    const penWidthInput = document.getElementById('penWidth');
    penWidthInput.addEventListener('input', (e) => {
        strokeWidth = e.target.value;
    });

    // Clear Canvas Button
    document.getElementById('btnClearCanvas').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        showToast('판서 캔버스가 초기화되었습니다.');
    });

    // Save Canvas PNG Button
    document.getElementById('btnSaveCanvas').addEventListener('click', () => {
        const imageURI = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'Hyundai_IT_Smartboard_Notes.png';
        link.href = imageURI;
        link.click();
        showToast('판서 화면이 저장되었습니다!');
    });

    // Dual Window Toggle
    const btnModeSingle = document.getElementById('btnModeSingle');
    const btnModeDual = document.getElementById('btnModeDual');
    const dualLeftPanel = document.getElementById('dualLeftPanel');

    btnModeSingle.addEventListener('click', () => {
        btnModeSingle.classList.add('active');
        btnModeDual.classList.remove('active');
        dualLeftPanel.classList.remove('show');
        setTimeout(resizeCanvas, 200);
    });

    btnModeDual.addEventListener('click', () => {
        btnModeDual.classList.add('active');
        btnModeSingle.classList.remove('active');
        dualLeftPanel.classList.add('show');
        setTimeout(resizeCanvas, 200);
    });

    // AI Popup Simulator Controls
    const aiPopup = document.getElementById('aiPopup');
    const aiPopupClose = document.getElementById('aiPopupClose');

    document.getElementById('btnAiSearch').addEventListener('click', () => {
        // Draw simulated circle animation
        ctx.save();
        ctx.strokeStyle = '#00FF88';
        ctx.lineWidth = 4;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        aiPopup.classList.add('show');
    });

    document.getElementById('btnAiSummary').addEventListener('click', () => {
        aiPopup.classList.add('show');
    });

    aiPopupClose.addEventListener('click', () => {
        aiPopup.classList.remove('show');
    });

    // Initial Canvas Resize
    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 100);

    /* --------------------------------------------------------------------------
     * 5. PRODUCT TABS FILTERING & SPEC MODALS
     * -------------------------------------------------------------------------- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            tabBtns.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Product Spec Data Repository
    const productSpecs = {
        alpha3: {
            title: '현대 스마트보드 Alpha 3.0 (IX-Series)',
            tag: '구글 EDLA 인증 4K 전자칠판',
            content: `
                <p>현대 스마트보드 Alpha 3.0은 구글 공식 EDLA 인증을 탑재한 최신 4K UHD 스마트 전자칠판입니다. 안드로이드 15와 구글 메인 생태계 앱(Google Classroom, Drive, Docs, Meet)을 기본 제공합니다.</p>
                <table class="spec-table">
                    <tr><th>디스플레이</th><td>4K UHD (3840 x 2160) IPS 178° 광시야각</td></tr>
                    <tr><th>구동 OS</th><td>Android 15 (구글 Play 스토어 지원) / Windows 11 OPS (선택)</td></tr>
                    <tr><th>터치 기술</th><td>Zero-Bonding 고정밀 IR 터치 (20포인트 멀티터치)</td></tr>
                    <tr><th>AI 화상회의</th><td>1300만 화소 AI 자동 피사체 추적 카메라 + 8-Array 마이크</td></tr>
                    <tr><th>유리 사양</th><td>7H 강화유리, Anti-Glare 눈부심 방지, 지문 방지 코팅</td></tr>
                    <tr><th>기본 제공 SW</th><td>미팅메이트 3.0 판서 소프트웨어 무상 라이선스</td></tr>
                </table>
            `
        },
        outdoorH: {
            title: '아웃도어 버스 쉘터 사이니지 (H-Series)',
            tag: 'IP66 3,500nits 초고휘도 디스플레이',
            content: `
                <p>혹독한 야외 직사광선과 강우 환경에서도 24시간 선명하고 안전하게 정보를 제공하는 특허받은 아웃도어 전용 디스플레이 시스템입니다.</p>
                <table class="spec-table">
                    <tr><th>화면 밝기</th><td>3,500 nits (자동 조도 감지 센서 탑재)</td></tr>
                    <tr><th>방수방진</th><td>IP66 완전 방수방진 등급 밀폐 구조</td></tr>
                    <tr><th>온도 제어</th><td>-30℃ ~ +50℃ 특허 공기순환 순환냉각 팬 시스템</td></tr>
                    <tr><th>유리 스펙</th><td>6mm IK10 내충격 강화파손 방지 유전체 유리</td></tr>
                    <tr><th>원격 관리</th><td>웹 기반 CMS 원격 모니터링 & 시스템 전원 제어</td></tr>
                </table>
            `
        },
        videowallVW: {
            title: '초슬림 베젤 비디오월 (VW-Series)',
            tag: '0.88mm 심리스 초대형 몰입형 스크린',
            content: `
                <p>0.88mm 극초슬림 베젤로 여러 대의 디스플레이를 결합 시 경계선 이질감이 없는 초대형 미디어월 화면을 구성할 수 있습니다.</p>
                <table class="spec-table">
                    <tr><th>베젤 두께</th><td>0.88mm Extreme Narrow Bezel</td></tr>
                    <tr><th>가동 시간</th><td>24시간 365일 연속 가동 (산업용 Grade 패널)</td></tr>
                    <tr><th>명암비</th><td>500,000 : 1 고명암비 지원</td></tr>
                    <tr><th>입출력</th><td>HDMI, DisplayPort, Daisy Chain 4K 60Hz 보장</td></tr>
                    <tr><th>설치 방식</th><td>전면 탈부착 유압식 비디오월 전용 매립 브라켓</td></tr>
                </table>
            `
        },
        meetingmate: {
            title: '현대 미팅메이트 (MeetingMate 3.0)',
            tag: '스마트 협업 및 무선 미러링 판서 소프트웨어',
            content: `
                <p>문서나 영상 위에 제한 없이 손쉽게 무제한 판서를 진행하고 9대 기기의 화면을 동시에 공유하는 종합 협업 툴입니다.</p>
                <table class="spec-table">
                    <tr><th>무선 미러링</th><td>최대 9채널 분할 화면 동시 송출 (iOS, Android, Windows, Mac)</td></tr>
                    <tr><th>회의록 저장</th><td>QR코드 스캔 즉시 스마트폰 다운로드 & Cloud 자동 업로드</td></tr>
                    <tr><th>스마트 툴</th><td>지능형 도형 인식, 텍스트 변환, 타이머, 투표 및 지우개 모션</td></tr>
                    <tr><th>보안 기능</th><td>세션 종료 후 일회성 판서 데이터 자동 보안 삭제 기능</td></tr>
                </table>
            `
        }
    };

    const specModal = document.getElementById('specModal');
    const specModalTitle = document.getElementById('specModalTitle');
    const specModalTag = document.getElementById('specModalTag');
    const specModalBody = document.getElementById('specModalBody');
    const specModalQuoteBtn = document.getElementById('specModalQuoteBtn');

    document.querySelectorAll('.view-spec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productKey = btn.getAttribute('data-product');
            const data = productSpecs[productKey];
            if (data) {
                specModalTitle.textContent = data.title;
                specModalTag.textContent = data.tag;
                specModalBody.innerHTML = data.content;
                specModalQuoteBtn.setAttribute('data-preset', data.title);
                openModal('specModal');
            }
        });
    });

    /* --------------------------------------------------------------------------
     * 6. ROI & SPEC CALCULATOR LOGIC
     * -------------------------------------------------------------------------- */
    let selectedSpace = 'office';
    let selectedPurpose = 'meeting';
    let selectedCapacity = 'small';

    function setupOptionGroup(groupId, callback) {
        const container = document.getElementById(groupId);
        const btns = container.querySelectorAll('.opt-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                callback(btn.getAttribute('data-val'));
                calculateRecommendation();
            });
        });
    }

    setupOptionGroup('optSpace', val => selectedSpace = val);
    setupOptionGroup('optPurpose', val => selectedPurpose = val);
    setupOptionGroup('optCapacity', val => selectedCapacity = val);

    function calculateRecommendation() {
        const recModelName = document.getElementById('recModelName');
        const recPriceRange = document.getElementById('recPriceRange');
        const recFeatures = document.getElementById('recFeatures');
        const btnApplyRec = document.getElementById('btnApplyRec');

        let model = '';
        let price = '';
        let features = [];

        if (selectedSpace === 'outdoor') {
            model = '아웃도어 버스 쉘터 사이니지 55"/75" (H-Series)';
            price = '야외 전용 IP66 방수 방진 패키지 (상담 후 맞춤 산출)';
            features = [
                '3,500 nits 자동 조도 감지 직사광선 완벽 대응',
                'IP66 등급 특허 순환 공기 냉각 시스템',
                '6mm IK10 내충격 파손방지 특수 강화유리'
            ];
        } else if (selectedCapacity === 'large' || selectedSpace === 'lobby') {
            model = '초슬림 베젤 비디오월 VW 3x3 패키지 또는 98인치 스마트보드';
            price = '대형 대강당/로비 전용 셋업 (기업 최저 할인 적용)';
            features = [
                '0.88mm 심리스 극초슬림 베젤 스크린',
                '24시간 365일 continuous operation',
                '통합 CMS 매트릭스 컨트롤 시스템 제공'
            ];
        } else if (selectedCapacity === 'medium') {
            model = '현대 스마트보드 Alpha 3.0 86인치 (IX-86)';
            price = '중대형 회의실 & 스마트 교실 베스트셀러 모델';
            features = [
                '구글 EDLA 공식 인증 (Google Workspace 순정 호환)',
                '13MP AI 카메라 & 8-Array 노이즈 캔슬링 마이크',
                '미팅메이트 3.0 9채널 무선 공유 및 무상 방문 설치'
            ];
        } else {
            model = '현대 스마트보드 Alpha 3.0 65인치 / 75인치 (IX-75)';
            price = '소형 회의실 / 학원 최적가 추천 패키지';
            features = [
                '4K UHD Zero-Bonding 10ms 초고속 필기감',
                '안드로이드 15 기반 빠른 구동 및 듀얼 OS 지원',
                '스마트 펜 & 미팅메이트 SW 기본 무상 증정'
            ];
        }

        recModelName.textContent = model;
        recPriceRange.textContent = price;
        btnApplyRec.setAttribute('data-preset', model);

        recFeatures.innerHTML = features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('');
    }

    /* --------------------------------------------------------------------------
     * 7. MODALS & FORMS HANDLER
     * -------------------------------------------------------------------------- */
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
        }
    }

    function closeModal(modal) {
        modal.classList.remove('open');
    }

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const preset = btn.getAttribute('data-preset');
            
            if (modalId === 'inquiryModal' && preset) {
                const select = document.getElementById('inqProductSelect');
                if (select) {
                    for (let opt of select.options) {
                        if (opt.value.includes(preset) || preset.includes(opt.value)) {
                            opt.selected = true;
                            break;
                        }
                    }
                }
            }
            openModal(modalId);
        });
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // Inquiry Form Submit Simulation
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const company = document.getElementById('inqCompany').value;
            closeModal(document.getElementById('inquiryModal'));
            showToast(`${company} 담당자님, 견적 문의가 정상 접수되었습니다. 담당 매니저가 곧 연락드립니다.`);
            inquiryForm.reset();
        });
    }

    // Demo Form Submit Simulation
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal(document.getElementById('demoModal'));
            showToast(`무료 방문 시연 신청이 완료되었습니다! 전담 엔지니어가 접수 확인 전화를 드립니다.`);
            demoForm.reset();
        });
    }

    /* --------------------------------------------------------------------------
     * 8. TOAST NOTIFICATION UTILITY
     * -------------------------------------------------------------------------- */
    function showToast(msg) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        toastMsg.textContent = msg;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});
