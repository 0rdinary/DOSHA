import { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../styles/Danger.scss';
import Loading from '../../components/Loading';

const dangerText = [
  '사무실 환기 어려움에 따른 호흡기 질환 위험', // [0] 일반사무(작업환경) 시작
  '동계기간 공조시스템 가동에 따른 안구건조증 발생',
  '하계기간 공조시스템 가동에 의한 냉방병', // [2] 일반사무(작업환경) 끝
  '과도한 시간외 근로 발생으로 인한 스트레스', // [3] 일반사무(작업특성) 시작
  '직장 내 소위 갑질이나 폭언에 의한 스트레스',
  '업무 과중으로 인한 스트레스',
  '무거운 짐 운반에 의한 요추 부상', // [6] 일반사무(작업특성) 끝
  '사무실 통로 정리정돈 불량에 의한 낙상', // [7] 일반사무(기계,물질적) 시작
  '사무실 내 이동통로 협소에 의한 끼임 등의 상해 발생',
  '사무실 바닥 미끄러움에 의한 낙상',
  '유리 출입문에 충돌하여 상해 발생',
  '유리 출입문 파손 및 유리파편에 의한 상해 발생',
  '동계기간 개별 저열기구 사용에 따른 화재위험', // [12] 일반사무(기계, 물질적) 끝
  '장시간 PC 사용에 의한 VDT 증후군 발생', // [13] 문서작업 시작
  '장시간 마우스 사용에 의한 손목터널 증후군 발생',
  '장시간 착석에 의한 요추 상해 발생',
  '장시간 착석에 의한 소화 불량',
  '사무용품 사용시 손가락 베임',
  '파쇄기 투입구로 옷이 빨려들어감에 의한 상해 발생', // [18] 문서작업 끝
  '정수기 오조작에 의한 뜨거운 온수에 의한 화상', // [19] 식음료제조 시작
  '커피포트 등의 뜨거운 온수에 의한 화상', // [20] 식음료제조 끝
  '장시간 전화업무에 의한 직무스트레스 발생위험', // [21] 유선업무 시작, 끝
  '사무용가구(책상,의자 서랍장) 모서리에 충돌 위험', // [22] 이동 시작
  '타 공간 이동시 사무실 바닥 턱에 걸려 낙상',
  '계단에서 미끄러움으로 인한 낙상',
  '계단의 개방된 측면으로의 낙하', // [25] 이동 끝
  '콘센트 오조작으로 인한 감전 발생 위험', // [26] 전력사용 시작
  '콘센트 과부하로 인한 화재 발생 위험', // [27] 전력사용 끝
  '문서고 문서보관 레일에 끼임 사고 발생', // [28] 문서적재 시작
  '문서고에 문서박스 낙하 및 신체 충격에 의한 상해 발생', // [29] 문서 적재 끝
  '수납장 문을 열자 수납물품 낙하하여 신체에 충격 및 상해발생', // [30] 물품수납, 적치 시작
  '적치 불량에 따른 물품 낙하로 인한 상해 발생', // [31] 물품수납, 적치 끝
  '비상구 관리 미흡으로 인한 화재사고 발생시 사망,상해율 증가', // [32] 소방활동 시작
  '소화기구 미비 또는 노후화로 인한 화재사고 발생시 사망,상해율 증가', // [33] 소방활동 끝
];

const DangerItemView = ({ start, end, inputs }) => {
  const { accessToken } = useSelector((state) => state.authReducer);
  const [imgSrc, setImgSrc] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const component = [];

  const loadImage = async (id) => {
    setLoading(true);
    const url = process.env.REACT_APP_DB_HOST + '/api/risk/image';
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(url, {
      responseType: 'blob',
      params: { id },
      headers,
    });
    // const newFile = new File([response.data], '조치내용');
    // const reader = new FileReader();
    // reader.onload = (ev) => {
    //   const previewImage = String(ev.target?.result);
    //   setImgSrc(previewImage);
    // };
    // reader.readAsDataURL(newFile);
    const img = window.URL.createObjectURL(new Blob([response.data]));
    setImgSrc(img);
    setModalOpen(true);
    setLoading(false);
  };

  for (let i = start; i <= end; i += 1) {
    component.push(
      <div key={i} style={{ display: 'flex', marginLeft: '2vh' }}>
        {loading && <Loading />}
        <Modal
          info
          title="조치내용"
          width="70vw"
          height="70vh"
          style={{ width: '70vw', height: '50vh' }}
          okText="확인"
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
        >
          <img
            style={{ width: '40vw', height: '70vh' }}
            src={imgSrc}
            alt="조치내용"
          />
        </Modal>
        <div style={{ width: '50%' }}>
          <h3>{dangerText[i]}</h3>
          <h3>{inputs[i].cur}</h3>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: '2vh', marginRight: '1vh' }}>
            <h3>가능성(빈도)</h3>
            <h3>{inputs[i].frequency}</h3>
          </div>
          <div>
            <h3>중대성(강도)</h3>
            <h3>{inputs[i].intensity}</h3>
          </div>
          {inputs[i].frequency * inputs[i].intensity >= 4 && (
            <div style={{ marginLeft: '2vh' }}>
              <h3 style={{ fontWeight: 'bold' }}>조치 내용 확인</h3>
              <Button
                onClick={() => {
                  loadImage(inputs[i].id);
                }}
              >
                확인하기
              </Button>
            </div>
          )}
        </div>
      </div>,
    );
  }
  return component;
};

export default DangerItemView;
