const User = require("../models/user");

// 프로필 페이지를 렌더링하는 함수 정의
exports.renderProfile = (req, res) => {
    // 'profile' 템플릿 렌더링, 'title' 변수에 '내 정보 -NodeBird'값 설정
    res.render('profile', { title: '내 정보 - NodeBird' });
};

// 회원 가입 페이지를 렌더링하는 함수 정의
exports.renderJoin = (req, res) => {
    // 'join' 템플릿 렌더링, 'title' 변수에 '회원 가입 - NodeBird'값 설정
    res.render('join', { title: '회원 가입 - NodeBird' });
};

// 메인 페이지를 렌더링하는 함수 정의
exports.renderMain = async (req, res, next) => {
    try {
        // Post 모델에서 모든 포스트 찾기
        const posts = await Post.findAll({
            // User 모델을 포함하여 각 포스트 작성자의 id와 nick속성 가져오기
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            // 생성시각(createAt)을 기준으로 내림차순(DESC) 정렬
            order: [['createAt', 'DESC']],
        });
        // 'main' 템플릿 렌더링, 'title' 및 'twits' 변수 설정
        // 'twits' 변수 -> 포스트 목록(posts) 설정
        res.render('main', {
            title: 'NodeBird', // 페이지 타이틀을 설정합니다.
            twits: posts, // 트윗 목록을 설정합니다.
        });
    } catch (err) {
        // 에러 발생 -> 콘솔에 에러 출력, 에러 처리 미들웨어로 전달
        console.error(err); // 에러를 콘솔에 출력
        next(err); // 에러를 다른 미들웨어에 전달
    }
}