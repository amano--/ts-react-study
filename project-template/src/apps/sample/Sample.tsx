import { useState, VFC } from 'react'

type SampleProps = { hoge: string }
export const Sample: VFC<SampleProps> = (props) => {
  const [state, setState] = useState(false)
  console.log('')
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
    </>
  )
}
