'use strict'

import chalk from 'chalk'
import yosay from 'yosay'

import Generator from 'yeoman-generator'

export default class AppGeneratorClass extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to ' + chalk.red('nodejs-microservice-quickstart') + ' generator!'))
  }

  initializing () {
    this.log('Generating Node.js Microservices')
  }

  prompting () {
    const that = this

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the application name?',
        default: 'user-management-nodejs-service'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the application description?',
        default: 'A Node.js microservice that handles user-related CRUD operations by adhering to architectural guidelines and best practices.'
      },
      {
        type: 'input',
        name: 'version',
        message: function (props) {
          return 'What is the application version?'
        },
        default: that.config.get('version') || '0.1.0'
      },
      {
        type: 'input',
        name: 'author',
        message: function (props) {
          return 'Who is the author of this application?'
        },
        default: that.config.get('author') || 'nobody'
      },
      {
        type: 'number',
        name: 'port',
        message: function (props) {
          return 'What is the default port container?'
        },
        default: that.config.get('port') || '9000'
      },
      {
        type: 'number',
        name: 'hostPort',
        message: function (props) {
          return 'What is the default port host?'
        },
        default: that.config.get('hostPort') || '3000'
      },
      {
        type: 'input',
        name: 'buildImage',
        message: function (props) {
          return 'What is the default build image?'
        },
        default: that.config.get('buildImage') || 'node:latest'
      },
      {
        type: 'input',
        name: 'productionImage',
        message: function (props) {
          return 'What is the default production image?'
        },
        default: that.config.get('productionImage') || 'node:20.5.1-bookworm-slim'
      },
      {
        type: 'list',
        name: 'buildingContainerImages',
        message: 'Which types of building container images?',
        default: 'buildah',
        choices: [
          'docker',
          'buildah'
        ]
      },
      {
        type: 'input',
        name: 'userDockerHub',
        message: function (props) {
          return 'What is the user docker.io?'
        },
        when: function (props) {
          return props.buildingContainerImages && props.buildingContainerImages === 'buildah'
        },
        default: function (props) {
          return that.config.get('userDockerHub') || props.author
        }
      },
      {
        type: 'input',
        name: 'srcDir',
        message: 'Where to put the source code?',
        default: that.config.get('srcDir') || 'src'
      },
      {
        type: 'input',
        name: 'apiRoot',
        message: function (props) {
          return 'What is the root of your API?'
        },
        default: that.config.get('apiRoot') || '/'
      }
    ]

    return this.prompt(prompts).then(
      function (props) {
        that.props = props

        that.config.set({
          name: props.name,
          description: props.description,
          srcDir: props.srcDir,
          apiRoot: props.apiRoot,
          author: props.author,
          version: props.version,
          port: props.port,
          buildImage: props.buildImage,
          productionImage: props.productionImage,
          buildingContainerImages: props.buildingContainerImages,
          userDockerHub: props.userDockerHub,
          hostPort: props.hostPort
        })
      })
  }

  writing () {
    const props = this.props
    const copyTpl = this.fs.copyTpl.bind(this.fs)
    const tPath = this.templatePath.bind(this)
    const dPath = this.destinationPath.bind(this)

    copyTpl(tPath('**/*'), dPath(props.srcDir), props)
    copyTpl(tPath('.*'), dPath(props.srcDir), props)
  }

  install () {
  }

  end () {
    const props = this.props
    this.log(chalk.green(`Application ${props.name} generated successfully!!!`))
  }
}
