export default function WorklogTable() {
  return (
    <div className="table-wrap">
      <table className="table">
        <tbody>
          <tr>
            <td className="t-num">1</td>
            <td>HU1</td>
            <td>MES</td>
            <td className="t-ellipsis">헝가리1,2,시...</td>
            <td>업무내용</td>
            <td>07:09</td>
            <td>홍길동</td>
            <td>B조 / 이희호</td>
            <td>무야호</td>
          </tr>
          <tr>
            <td className="t-num">2</td>
            <td>CA</td>
            <td>MES</td>
            <td className="t-ellipsis">천안 IT 상황...</td>
            <td>업무내용</td>
            <td>08:10</td>
            <td>홍길동</td>
            <td>B조 / 문호찬</td>
            <td>무야호</td>
          </tr>
          <tr>
            <td className="t-num">3</td>
            <td>CA</td>
            <td>MES</td>
            <td className="t-ellipsis">천안 IT 상황...</td>
            <td>업무내용</td>
            <td>08:11</td>
            <td>홍길동</td>
            <td>B조 / 이희호</td>
            <td>무야호</td>
          </tr>
          <tr>
            <td className="t-num">1</td>
            <td>HU1</td>
            <td>MES</td>
            <td className="t-ellipsis">헝가리1,2,시...</td>
            <td>업무내용</td>
            <td>09:50</td>
            <td>홍길동</td>
            <td>B조 / 이희호</td>
            <td>무야호</td>
          </tr>
          <tr>
            <td className="t-num">2</td>
            <td>CA</td>
            <td>MES</td>
            <td className="t-ellipsis">천안 IT 상황...</td>
            <td>업무내용</td>
            <td>10:00</td>
            <td>홍길동</td>
            <td>B조 / 문호찬</td>
            <td>무야호</td>
          </tr>
          <tr>
            <td className="t-num">3</td>
            <td>CA</td>
            <td>MES</td>
            <td className="t-ellipsis">천안 IT 상황...</td>
            <td>업무내용</td>
            <td>10:20</td>
            <td>홍길동</td>
            <td>B조 / 이희호</td>
            <td>무야호</td>
          </tr>
        </tbody>
      </table>

      <div className="pager">
        <button className="pager__btn is-active" type="button">
          1
        </button>
        <button className="pager__btn" type="button">
          2
        </button>
        <button className="pager__btn" type="button">
          3
        </button>
        <button className="pager__btn" type="button">
          4
        </button>
        <button className="pager__btn" type="button">
          5
        </button>
      </div>
    </div>
  );
}
