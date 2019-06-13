let projectsVue

document.addEventListener('DOMContentLoaded', function() {
	// showWait()
	projectsVue = new Vue({
		el: '#projectList',
		data: {
			projects: [],
			selectedProject: {
				description: '',
				cost: '',
				owner: '',
				url: '',
				name: '',
				date: '',
				projectUrl: '',
				youtubeUrl: '',				
				type: '',
				images: []
			},
			requestURL: '/project/create'
		},

		methods: {
			poplateProjects: function() {
				let currentVue = this

				fetch('/api/projects')
					.then(function(response) {
						return response.json()
					})
					.then(function(projects) {
						currentVue.projects = projects
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
			},
			viewProject: function(id) {
				localStorage.setItem('selectedProject', id)
				window.location.href = '/project'
			},
			onSubmit: function() {
				fetch(projectsVue.requestURL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(projectsVue.selectedProject)
				})
					.then(function(response) {
						M.toast({ html: 'Project details sent!' })
						M.Modal.getInstance(document.querySelector('#edit-modal'))
							.close()
							.destroy()
						projectsVue.poplateProjects()

						// TODO: redirect to success page
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
					.then(function() {
						// hideWait()
					})
			}
		},

		mounted: function() {
			this.poplateProjects()
			// M.AutoInit()
			// hideWait()
		}
	})

	/* document.querySelector('#project-image').addEventListener('change',function(){

	}) */
})

function deleteproject() {
	if (projectsVue.selectedProject._id != '' || projectsVue.selectedProject._id != undefined) {
		if (confirm('Are you sure you want to delete?')) {
			fetch('/project/' + projectsVue.selectedProject._id + '/delete', {
				method: 'POST'
			})
				.then(response => response.json())
				.then(status => {
					if (status) {
						projectsVue.poplateProjects()
						clearproject()
						M.Modal.getInstance(document.querySelector('#edit-modal'))
							.close()
							.destroy()
					}
				})
				.catch(function(error) {
					M.toast({ html: 'Error occured! Check console for details.' })
					console.error(error)
				})
		}
	}
}

function populate(id) {
	fetch('/project/' + id)
		.then(response => response.json())
		.then(function(project) {
			projectsVue.selectedProject = project

			M.Modal.init(document.querySelector('#edit-modal')).open()

			M.updateTextFields()

			document.querySelector('#modal-heading').innerHTML = 'Edit project'

			projectsVue.requestURL = '/project/' + id + '/update'
		})
}

function clearproject() {
	M.Modal.init(document.querySelector('#edit-modal')).open()

	document.querySelector('#modal-heading').innerHTML = 'Create project'

	projectsVue.selectedProject = {
		description: '',
		cost: '',
		owner: '',
		url: '',
		name: '',
		date: '',
		projectUrl: '',
		youtubeUrl: '',		
		type: '',
		images: []
	}

	projectsVue.requestURL = '/project/create'
}

const uploadFile = function(file, signedRequest, url) {
	// showWait()
	// currentVue = this

	fetch(signedRequest, {
		method: 'PUT',
		mode: 'cors',
		body: file
	})
		.then(function(response) {
			// projectsVue.selectedProject.images.push(file)
			projectsVue.selectedProject.images.push(url)
		})
		.catch(function(error) {
			M.toast({ html: 'Error occured! Check console for details.' })
			console.error(error)
		})
		.then(function() {
			// hideWait()
		})
}

const getSignedRequest = function(file) {
	// console.log(file)

	fetch(`/api/project/sign-s3/put?fileName=${file.name}&fileType=${file.type}`)
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			console.log(data)
			uploadFile(file, data.signedRequest, data.url)
		})
		.catch(function(error) {
			M.toast({ html: 'Error occured! Check console for details.' })
			console.error(error)
		})
}
const onFileUpload = function() {
	let file = document.querySelector('#project-image').files[0]
	// console.log(file)
	if (file == null) return alert('No file selected.')
	getSignedRequest(file)
}

function deleteImage(imageURL) {
	let filename = imageURL.split('/').slice(-1)[0]

	fetch(`/api/project/image/delete?fileName=${filename}`)
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			// console.log(data)
			// if (data) {
			let index = projectsVue.selectedProject.images.indexOf(imageURL)
			// console.log(filename)
			if (index > -1) {
				projectsVue.selectedProject.images.splice(index, 1)
			}
			// }
		})
		.catch(function(error) {
			M.toast({ html: 'Error occured! Check console for details.' })
			console.error(error)
		})
}
