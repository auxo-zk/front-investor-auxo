de:
	conda deactivate
lib:
	yarn remove @auxo-dev/auxo-libs && yarn add @auxo-dev/auxo-libs

dkg:
	yarn remove @auxo-dev/dkg && yarn add @auxo-dev/dkg

plat:
	yarn remove @auxo-dev/platform && yarn add @auxo-dev/platform

all:
	yarn remove o1js @auxo-dev/auxo-libs @auxo-dev/dkg @auxo-dev/platform && yarn add o1js @auxo-dev/auxo-libs @auxo-dev/dkg @auxo-dev/platform