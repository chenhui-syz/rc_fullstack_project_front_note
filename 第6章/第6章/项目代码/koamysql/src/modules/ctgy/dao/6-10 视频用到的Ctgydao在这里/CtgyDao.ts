import findSecThrdCtgysByFstCtgyId from '../../../modules/ctgy/defmodel/OneToMany'
class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThrdCtgys(firstctgyid: string) {
    return findSecThrdCtgysByFstCtgyId(parseInt(firstctgyid))
  }
}
export default CtgyDao.ctgyDao
