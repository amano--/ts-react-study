import { VFC } from 'react'

type SampleProps = { hoge: string }
const Sample: VFC<SampleProps> = (props) => {
  // const [state, setState] = useState()
  return (



    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.hoge}
      </div>
      <div
        style={{
          // borderTop: '4px solid #fb8a0b',
          width: '100%',
          height: '100%',
          margin: '4px',
        }}
      >
        {props.hoge}
      </div>
    </>
  )
}
