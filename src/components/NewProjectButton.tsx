import { Project, Action } from '@/types'


interface NPBProps {
    loading: boolean,
    loadingProjects: boolean,
    projects: Project[],
    openProjectModal: () => void
}

const NewProjectButton = ( {loading, loadingProjects, projects, openProjectModal} : NPBProps) => {
    if (loading || loadingProjects) {
    return <p>Loading...</p>;  //early return
  }

    return <>
      {projects.length === 3? (
          <p></p>
        ): (
        <button className="mt-3"
          onClick={openProjectModal} >
          New Project
        </button>        
      )}
    </>
}

export default NewProjectButton;