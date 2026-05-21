import { NextRequest, NextResponse } from 'next/server'

const FREE_SERVICES = [
  'Visual Design (CI/BI)',
  'Web Design',
  'Photography',
  'Marketing',
  'Brand Strategy',
  '기타',
]

const PACKAGE_SERVICES = [
  'Starter — 스타트업 & 소규모',
  'Growth — 성장하는 기업',
  'Enterprise — 대기업 & 프랜차이즈',
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { consultType, name, phone, email, company, budget, services, message } = body

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: '필수 항목을 입력해 주세요.' }, { status: 400 })
    }

    const typeLabel = consultType === 'package' ? '패키지 상담' : '무료 상담'
    const servicesText = Array.isArray(services) && services.length > 0
      ? services.join(', ')
      : '미선택'

    // 1) 이메일 발송 (카페24 SMTP 또는 다른 서비스 연결)
    // TODO: nodemailer 또는 Resend API 연결
    const emailBody = `
[NEWDIA ${typeLabel} 신청]
신청일시: ${new Date().toLocaleString('ko-KR')}

이름: ${name}
연락처: ${phone}
이메일: ${email}
회사/브랜드: ${company || '미입력'}
예산: ${budget || '미입력'}
관심 서비스: ${servicesText}

문의 내용:
${message}
    `.trim()

    // 2) 카카오 알림 (토큰 설정 후 활성화)
    const kakaoToken = process.env.KAKAO_ACCESS_TOKEN
    if (kakaoToken) {
      const kakaoMsg = [
        `[NEWDIA 신규 ${typeLabel} 접수]`,
        `이름: ${name}`,
        `연락처: ${phone}`,
        `이메일: ${email}`,
        `예산: ${budget || '미입력'}`,
        `서비스: ${servicesText}`,
      ].join('\n')

      await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          template_object: JSON.stringify({
            object_type: 'text',
            text: kakaoMsg,
            link: { web_url: process.env.ADMIN_URL || '' },
          }),
        }),
      }).catch(() => null)
    }

    // 3) DB 저장 (MySQL 연결 후 활성화)
    // TODO: mysql2 또는 Supabase 연결

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
