{/* Filters - Desktop */}
  <div className="hidden md:block md:col-span-1">
    <Card className="sticky top-24 bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Reset All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Domain Filter */}
        <div>
          <h4 className="font-medium mb-2 text-gray-300">Domain</h4>
          <RadioGroup
            value={selectedDomain}
            onValueChange={setSelectedDomain}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="domain-all" className="text-primary border-gray-600" />
                <Label htmlFor="domain-all" className="text-gray-200">All Domains</Label>
              </div>
              {domains.map((domain) => (
                <div
                  key={domain}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={domain}
                    id={`domain-${domain}`}
                    className="text-primary border-gray-600"
                  />
                  <Label htmlFor={`domain-${domain}`} className="text-gray-200">{domain}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Separator className="bg-gray-700" />

        {/* Discipline Filter */}
        <div>
          <h4 className="font-medium mb-2 text-gray-300">Discipline</h4>
          <ScrollArea className="h-48">
            <RadioGroup
              value={selectedDiscipline}
              onValueChange={setSelectedDiscipline}
              className="pr-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="discipline-all" className="text-primary border-gray-600" />
                  <Label htmlFor="discipline-all" className="text-gray-200">
                    All Disciplines
                  </Label>
                </div>
                {disciplines.map((discipline) => (
                  <div
                    key={discipline}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={discipline}
                      id={`discipline-${discipline}`}
                      className="text-primary border-gray-600"
                    />
                    <Label htmlFor={`discipline-${discipline}`} className="text-gray-200">
                      {discipline}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  </div>