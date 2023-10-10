import ChessMove from './ChessMove'
import { HistoryProps } from '@/utils/interface'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { ScrollArea } from '@/shadcn_components/ui/scroll_area'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const History = ({ historyData }: HistoryProps) => {
    return (
        <div className='bg-[#21201D] h-full flex flex-col py-[10px]'>
            <div className='flex flex-col h-full'>
                <span className='text-[#fff] font-bold px-[10px] pb-[10px]'>
                    Lịch sử
                </span>
                <div className='bg-[#93928A] w-full h-[1px] my-[10px]'></div>
                <div className='flex flex-col justify-between h-full'>
                    <ScrollArea className='h-full'>
                        {historyData
                            ? historyData?.map((turn, index) => {
                                  if (index > 0) {
                                      return (
                                          <div
                                              key={
                                                  turn.w?.after +
                                                  turn.w?.before +
                                                  turn.b?.after +
                                                  turn.b?.before
                                              }
                                              className='flex items-center mt-[2px]'
                                          >
                                              <div className='w-[50%]'>
                                                  {turn.w ? (
                                                      <ChessMove
                                                          turn={turn.w}
                                                      />
                                                  ) : null}
                                              </div>
                                              <div className='w-[50%]'>
                                                  {turn.b ? (
                                                      <ChessMove
                                                          turn={turn.b}
                                                      />
                                                  ) : null}
                                              </div>
                                          </div>
                                      )
                                  }
                                  return (
                                      <div
                                          key={
                                              turn.w?.after +
                                              turn.w?.before +
                                              turn.b?.after +
                                              turn.b?.before
                                          }
                                          className='flex items-center'
                                      >
                                          <div className='w-[50%]'>
                                              {turn.w ? (
                                                  <ChessMove turn={turn.w} />
                                              ) : null}
                                          </div>
                                          <div className='w-[50%]'>
                                              {turn.b ? (
                                                  <ChessMove turn={turn.b} />
                                              ) : null}
                                          </div>
                                      </div>
                                  )
                              })
                            : null}
                    </ScrollArea>
                    <div className='flex flex-col items-center justify-center w-full h-[80px]'>
                        <div className='bg-[#93928A] w-full h-[1px] my-[10px]'></div>
                        <div className='flex items-center justify-center space-x-6'>
                            <BiArrowToLeft className='text-[#90908E] w-[35px] h-[35px] cursor-pointer' />
                            <IoIosArrowBack
                                onClick={() => {}}
                                className='text-[#90908E] w-[30px] h-[30px] cursor-pointer'
                            />
                            <IoIosArrowForward className='text-[#90908E] w-[30px] h-[30px] cursor-pointer' />
                            <BiArrowToRight className='text-[#90908E] w-[35px] h-[35px] cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
