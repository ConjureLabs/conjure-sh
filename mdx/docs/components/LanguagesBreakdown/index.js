import node from './language-versions/node'
import python from './language-versions/python'
import ruby from './language-versions/ruby'
import java from './language-versions/java'
import php from './language-versions/php'

const allLangs = {
  Node: node,
  Python: python,
  Ruby: ruby,
  Java: java,
  PHP: php
}

export default () => (
  <div className='root'>
    {Object.keys(allLangs).map(key => (
      <div className='lang' key={key}>
        <h6>{key}</h6>
        {allLangs[key]
          .filter(obj => obj.suppress === false)
          .map(obj => (
            <span>{obj.content}</span>
          ))
        }
        {/*<a
          href=''
          onClick={}
        >
          See All
        </a> */}
      </div>
    ))}

    <style jsx>
      {`
        .root {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 2.4rem;
          padding-bottom: 2rem;
          position: relative;
        }

        .lang {
          display: flex;
          flex-direction: column;
          line-height: 2rem;
        }

        a {
          bottom: 0;
          font-size: 1.2rem;
          position: absolute;
          white-space: nowrap;
        }
      `}
    </style>
  </div>
)
