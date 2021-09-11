from db import aggregateData
from models.plotModel import PlotDataSubmission


def updateAggregateData(aggType:str,aggData):
    if aggType=="plot":
        newAggPlotData(aggData)
    return True

def newAggPlotData(plotData:PlotDataSubmission):

    return True